import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankeyLinkHorizontal, sankeyJustify, sankey as d3Sankey } from 'd3-sankey';

const size = {
  height: 600
};

const getMousePosition = event => {
  const CTM = event.target.getScreenCTM();

  return {
    x: (event.clientX - CTM.e) / CTM.a,
    y: (event.clientY - CTM.f) / CTM.d
  };
};

const formattedSankeyData = (data) => {
    const formattedData = {
        nodes: [],
        links: [],
    };
    for(let i=0;i<data.length; i++) {
        const link = data[i];
        const sourceIndex = formattedData.nodes.findIndex(item => item.name === link.source);
        const destinationIndex = formattedData.nodes.findIndex(item => item.name === link.destination);
        if(sourceIndex > -1 && destinationIndex > -1) {
            const newLink = {
                source: sourceIndex,
                target: destinationIndex,
                value: link.total_co2e,
            }
            formattedData.links.push(newLink);
        } else if(sourceIndex > -1) {
            formattedData.nodes.push({ name: link.destination});
            const newLink = {
                source: sourceIndex,
                target: formattedData.nodes.length - 1,
                value: link.total_co2e,
            }
            formattedData.links.push(newLink);
        } else if(destinationIndex > -1) {
            formattedData.nodes.push({ name: link.source});
            const newLink = {
                source: formattedData.nodes.length - 1,
                target: destinationIndex,
                value: link.total_co2e,
            }
            formattedData.links.push(newLink);
        } else {
            formattedData.nodes.push({ name: link.source});
            formattedData.nodes.push({ name: link.destination});
            const newLink = {
                source: formattedData.nodes.length - 2,
                target: formattedData.nodes.length - 1,
                value: link.total_co2e,
            }
            formattedData.links.push(newLink);
        }
    }
    return formattedData;
}

const Link = ({ data, width, length, colors }) => {
  const link = sankeyLinkHorizontal();

  return (
    <>
      <defs>
        <linearGradient
          id={`gradient-${data.index}`}
          gradientUnits="userSpaceOnUse"
          x1={data.source.x1}
          x2={data.target.x0}
        >
          <stop offset="0" stopColor={colors(data.source.index / length)} />
          <stop offset="100%" stopColor={colors(data.target.index / length)} />
        </linearGradient>
      </defs>
      <path
        d={link(data)}
        fill={"none"}
        stroke={`url(#gradient-${data.index})`}
        strokeOpacity={0.5}
        strokeWidth={width}
      />
    </>
  );
};

const CeroSankeyGraph = props => {
  const dragElement = useRef(null);
  const graph = useRef(null);
  const offset = useRef(null);

  const colors = props.edit ? d3.interpolateWarm : d3.interpolateCool;
  const sankey = d3Sankey()
    .nodeAlign(sankeyJustify)
    .nodeWidth(10)
    .nodePadding(10)
    .extent([[0, 0], [props.width, size.height]]);

  const onMouseUp = e => {
    dragElement.current = null;
  };

  const onMouseDown = e => {
    if (e.target.tagName === "rect") {
      dragElement.current = e.target;
      offset.current = getMousePosition(e);
      offset.current.y -= parseFloat(e.target.getAttributeNS(null, "y"));
    }
  };

  const onMouseMove = e => {
    if (dragElement.current) {
      const coord = getMousePosition(e);
      dragElement.current.setAttributeNS(null, "y", coord.y - offset.current.y);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const Rect = ({ index, x0, x1, y0, y1, name, value, length, colors }) => {
    return (
      <>
        <rect
          x={x0}
          y={y0}
          width={x1 - x0}
          height={y1 - y0}
          fill={colors(index / length)}
          data-index={index}
        />
        <text
          x={x0 < props.width / 2 ? x1 + 6 : x0 - 6}
          y={(y1 + y0) / 2}
          style={{
            fill: d3.rgb(colors(index / length)).darker(),
            alignmentBaseline: "middle",
            fontSize: 9,
            textAnchor: x0 < props.width / 2 ? "start" : "end",
            pointerEvents: "none",
            userSelect: "none"
          }}
        >
          {name}
        </text>
      </>
    );
  };
  
  if (props.data?.length) {
    const formatSankeyData = formattedSankeyData(props.data)
    graph.current = sankey(formatSankeyData);
    const { links, nodes } = graph.current;

    return (
      <svg width={props.width} height={size.height}>
        <g>
          {links.map((d, i) => (
            <Link
              data={d}
              width={d.width}
              length={nodes.length}
              colors={colors}
            />
          ))}
        </g>
        <g>
          {nodes.map((d, i) => (
            <Rect
              index={d.index}
              x0={d.x0}
              x1={d.x1}
              y0={d.y0}
              y1={d.y1}
              name={d.name}
              value={d.value}
              length={nodes.length}
              colors={colors}
            />
          ))}
        </g>
      </svg>
    );
  }
  if(props.isLoading) {
    return <div>Data Loading</div>;
  }

  return <div>{props.noDataText || 'No Data available'}</div>;
};

export default CeroSankeyGraph;
