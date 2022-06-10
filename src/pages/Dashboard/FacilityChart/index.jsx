import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from "@mui/material"
import * as d3 from "d3"

import { getFacilityTopicEmission } from '../../../redux/actions/dashboard';
import useStyles from './styles';

const radius = 320;
const width = 640;

const arrayData = [
  ["account-account-account-account-account-account",
  "1"],
  ["account-account-account-account-account-data",
  "2"],
  ["account-account-account-account-account-data",
  "8"],
  ["account-account-account-account-account-ajesh",
  "8"],
  ["account-account-cash-account-account-ajesh",
  "8"],
  ["account-account-cash-account-account-account",
  "1"],
  ["account-account-cash-account-account-data",
  "2"],
  ["account-account-cash-account-account-data",
  "8"],
  ["account-account-cash-account-account-ajesh",
  "8"]
];

const FacilityEmissionChart = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const facilityData = useSelector(state => state.dashboard.getFacilityTopicEmission.data);

    // const file = await FileAttachment("visit-sequences@1.csv").text();
    // const csv = d3.csvParseRows(file);

    const color = d3
        .scaleOrdinal()
        .domain(["home", "product", "search", "account", "other", "end"])
        .range(["#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb"])

    const buildHierarchy = (csv) => {
          // Helper function that transforms the given CSV into a hierarchical format.
          const root = { name: "root", children: [] };
          for (let i = 0; i < csv.length; i++) {
            console.log('i', i, root, csv)
            const sequence = csv[i][0];
            const size = +csv[i][1];
            if (isNaN(size)) {
              // e.g. if this is a header row
              continue;
            }
            const parts = sequence.split("-");
            let currentNode = root;
            for (let j = 0; j < parts.length; j++) {
              const children = currentNode["children"];
              const nodeName = parts[j];
              let childNode = null;
              if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                let foundChild = false;
                for (let k = 0; k < children.length; k++) {
                  if (children[k]["name"] == nodeName) {
                    childNode = children[k];
                    foundChild = true;
                    break;
                  }
                }
                // If we don't already have a child node for this branch, create it.
                if (!foundChild) {
                  childNode = { name: nodeName, children: [] };
                  children.push(childNode);
                }
                currentNode = childNode;
              } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = { name: nodeName, value: size };
                children.push(childNode);
              }
            }
          }
          return root;
        }

    const partition = data => {
      const heirarchyData = buildHierarchy(data);
      console.log('heirarchy data', heirarchyData);
      return d3.partition().size([2 * Math.PI, radius * radius])(
        d3
        .hierarchy(heirarchyData)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
      );
    }
        

    const arc = d3
        .arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(1 / radius)
        .padRadius(radius)
        .innerRadius(d => Math.sqrt(d.y0))
        .outerRadius(d => Math.sqrt(d.y1) - 1)

    const mousearc = d3
        .arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => Math.sqrt(d.y0))
        .outerRadius(radius)

    const getSunburstChart = () => {
        const root = partition(arrayData);
        const svg = d3.create("svg");
        // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
        const element = svg.node();
        element.value = { sequence: [], percentage: 0.0 };
      
        const label = svg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("fill", "#888")
          .style("visibility", "hidden");
      
        label
          .append("tspan")
          .attr("class", "percentage")
          .attr("x", 0)
          .attr("y", 0)
          .attr("dy", "-0.1em")
          .attr("font-size", "3em")
          .text("");
      
        label
          .append("tspan")
          .attr("x", 0)
          .attr("y", 0)
          .attr("dy", "1.5em")
          .text("of visits begin with this sequence");
      
        svg
          .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
          .style("max-width", `${width}px`)
          .style("font", "12px sans-serif");
      
        const path = svg
          .append("g")
          .selectAll("path")
          .data(
            root.descendants().filter(d => {
              // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
              return d.depth && d.x1 - d.x0 > 0.001;
            })
          )
          .join("path")
          .attr("fill", d => color(d.data.name))
          .attr("d", arc);
      
        svg
          .append("g")
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("mouseleave", () => {
            path.attr("fill-opacity", 1);
            label.style("visibility", "hidden");
            // Update the value of this view
            element.value = { sequence: [], percentage: 0.0 };
            element.dispatchEvent(new CustomEvent("input"));
          })
          .selectAll("path")
          .data(
            root.descendants().filter(d => {
              // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
              return d.depth && d.x1 - d.x0 > 0.001;
            })
          )
          .join("path")
          .attr("d", mousearc)
          .on("mouseenter", (event, d) => {
            // Get the ancestors of the current segment, minus the root
            const sequence = d
              .ancestors()
              .reverse()
              .slice(1);
            // Highlight the ancestors
            path.attr("fill-opacity", node =>
              sequence.indexOf(node) >= 0 ? 1.0 : 0.3
            );
            const percentage = ((100 * d.value) / root.value).toPrecision(3);
            label
              .style("visibility", null)
              .select(".percentage")
              .text(percentage + "%");
            // Update the value of this view with the currently hovered sequence and percentage
            element.value = { sequence, percentage };
            element.dispatchEvent(new CustomEvent("input"));
          });
        console.log('data', element)
        return element.node();
      }

    useEffect(() => {
        dispatch(getFacilityTopicEmission(props.filter));
    }, [dispatch, props.filter]);

    return (
        <Paper className={classes.container} >
            {getSunburstChart()}
            {/* <svg viewBox="-320 -320 640 640" style={{maxWidth: '640px', font: '12px sans-serif'}}><text textAnchor="middle" fill="#888" style={{visibility: 'hidden'}}><tspan className="percentage" x="0" y="0" dy="-0.1em" fontSize="3em"></tspan><tspan x="0" y="0" dy="1.5em">of visits begin with this sequence</tspan></text><g><path fill="#6fb971" d="M1.0412387642256935e-14,-170.0471948239516A170.0471948239516,170.0471948239516,0,1,1,-1.0412387642256935e-14,170.0471948239516A170.0471948239516,170.0471948239516,0,1,1,1.0412387642256935e-14,-170.0471948239516M-2.221790313898398e-14,-120.94863136295271A120.94863136295271,120.94863136295271,0,1,0,2.221790313898398e-14,120.94863136295271A120.94863136295271,120.94863136295271,0,1,0,-2.221790313898398e-14,-120.94863136295271Z"></path><path fill="#6fb971" d="M1.2766280018164066e-14,-208.48917462655268A208.48917462655268,208.48917462655268,0,1,1,-1.2766280018164066e-14,208.48917462655268A208.48917462655268,208.48917462655268,0,1,1,1.2766280018164066e-14,-208.48917462655268M-3.14208599466429e-14,-171.0471948239516A171.0471948239516,171.0471948239516,0,1,0,3.14208599466429e-14,171.0471948239516A171.0471948239516,171.0471948239516,0,1,0,-3.14208599466429e-14,-171.0471948239516Z"></path><path fill="#5d85cf" d="M0.4999997965494986,-240.89674383236763A240.89726272590542,240.89726272590542,0,1,1,-124.73887218265425,206.0866442917477L-108.41969328318648,179.25089788922693A209.48917462655268,209.48917462655268,0,1,0,0.4999997965495171,-209.48857793664487Z"></path><path fill="#6fb971" d="M-125.5932912395367,205.56706055313145A240.89726272590542,240.89726272590542,0,0,1,-0.4999997965494746,-240.89674383236763L-0.4999997965494497,-209.48857793664487A209.48917462655268,209.48917462655268,0,0,0,-109.27411234006885,178.7313141506107Z"></path><path fill="#6fb971" d="M0.4999997965495183,-269.44889760404357A269.4493615131253,269.4493615131253,0,1,1,-139.57411302136077,230.48215851586284L-125.25845724725104,206.94106552911217A241.89726272590542,241.89726272590542,0,1,0,0.4999997965495124,-241.89674597747108Z"></path><path fill="#6fb971" d="M-140.42853207824317,229.9625747772466A269.4493615131253,269.4493615131253,0,0,1,-0.49999979654955135,-269.44889760404357L-0.4999997965495421,-241.89674597747108A241.89726272590542,241.89726272590542,0,0,0,-126.11287630413342,206.42148179049596Z"></path><path fill="#6fb971" d="M0.4999997965495476,-295.26200857505796A295.2624319272165,295.2624319272165,0,1,1,-152.98619118238344,252.53738142120935L-140.09369786265407,231.33657938602045A270.4493615131253,270.4493615131253,0,1,0,0.49999979654951987,-270.4488993193735Z"></path><path fill="#6fb971" d="M-153.84061023926574,252.01779768259317A295.2624319272165,295.2624319272165,0,0,1,-0.4999997965495182,-295.26200857505796L-0.499999796549553,-270.4488993193735A270.4493615131253,270.4493615131253,0,0,0,-140.94811691953646,230.81699564740424Z"></path><path fill="#7c6561" d="M0.4999997965495569,-318.99960815054845A319,319,0,0,1,283.0050043277567,-147.2045091885653L262.81662703149584,-136.74373523937467A296.2624319272165,296.2624319272165,0,0,0,0.4999997965495294,-296.2620100040369Z"></path><path fill="#da7847" d="M283.4650691782869,-146.3166243314443A319,319,0,0,1,260.90141578485805,183.55231200248235L242.32548265978804,170.43998657923365A296.2624319272165,296.2624319272165,0,0,0,263.27669188202606,-135.85585038225366Z"></path><path fill="#7c6561" d="M260.32473569739494,184.36928156306692A319,319,0,0,1,-42.9417649334132,316.09651188268987L-39.84566238530572,293.5706929523191A296.2624319272165,296.2624319272165,0,0,0,241.74880257232496,171.25695613981824Z"></path><path fill="#da7847" d="M-43.9324504763385,315.9603452889999A319,319,0,0,1,-126.63118608355674,292.7892462353623L-117.57250220150065,271.93406424629245A296.2624319272165,296.2624319272165,0,0,0,-40.83634792823097,293.43452635862917Z"></path><path fill="#6fb971" d="M-127.54839701184807,292.39084530762585A319,319,0,0,1,-165.3198669341762,272.81924711586294L-153.5057758748934,253.39180204670313A296.2624319272165,296.2624319272165,0,0,0,-118.48971312979194,271.535663318556Z"></path><path fill="#da7847" d="M-166.17428599105853,272.29966337724676A319,319,0,0,1,-318.2900676286203,-21.27046894095879L-295.60547607144105,-19.718800369324786A296.2624319272165,296.2624319272165,0,0,0,-154.36019493177568,252.87221830808696Z"></path><path fill="#7c6561" d="M-318.22182524302355,-22.268137304196838A319,319,0,0,1,-127.54839701184794,-292.3908453076259L-118.48971312979194,-271.535663318556A296.2624319272165,296.2624319272165,0,0,0,-295.5372336858443,-20.716468732562795Z"></path><path fill="#da7847" d="M-126.63118608355674,-292.7892462353623A319,319,0,0,1,-43.932450476338374,-315.960345289L-40.83634792823098,-293.43452635862917A296.2624319272165,296.2624319272165,0,0,0,-117.57250220150054,-271.9340642462925Z"></path><path fill="#6fb971" d="M-42.94176493341321,-316.09651188268987A319,319,0,0,1,-0.4999997965492418,-318.99960815054845L-0.4999997965493683,-296.2620100040369A296.2624319272165,296.2624319272165,0,0,0,-39.8456623853056,-293.5706929523191Z"></path></g><g fill="none" pointerEvents="all"><path d="M1.9594348786357652e-14,-320A320,320,0,1,1,-1.9594348786357652e-14,320A320,320,0,1,1,1.9594348786357652e-14,-320M-2.221790313898398e-14,-120.94863136295271A120.94863136295271,120.94863136295271,0,1,0,2.221790313898398e-14,120.94863136295271A120.94863136295271,120.94863136295271,0,1,0,-2.221790313898398e-14,-120.94863136295271Z"></path><path d="M1.9594348786357652e-14,-320A320,320,0,1,1,-1.9594348786357652e-14,320A320,320,0,1,1,1.9594348786357652e-14,-320M-3.14208599466429e-14,-171.0471948239516A171.0471948239516,171.0471948239516,0,1,0,3.14208599466429e-14,171.0471948239516A171.0471948239516,171.0471948239516,0,1,0,-3.14208599466429e-14,-171.0471948239516Z"></path><path d="M1.9594348786357652e-14,-320A320,320,0,1,1,-166.26686401133867,273.41420945487636L-108.84721284212692,178.99161584335454A209.48917462655268,209.48917462655268,0,1,0,1.2827512358121434e-14,-209.48917462655268Z"></path><path d="M-166.26686401133867,273.41420945487636A320,320,0,0,1,-5.878304635907295e-14,-320L-3.84825370743643e-14,-209.48917462655268A209.48917462655268,209.48917462655268,0,0,0,-108.84721284212692,178.99161584335454Z"></path><path d="M1.9594348786357652e-14,-320A320,320,0,1,1,-166.26686401133867,273.41420945487636L-125.68593526988494,206.68171517969364A241.89726272590542,241.89726272590542,0,1,0,1.481193542598932e-14,-241.89726272590542Z"></path><path d="M-166.26686401133867,273.41420945487636A320,320,0,0,1,-5.878304635907295e-14,-320L-4.443580627796796e-14,-241.89726272590542A241.89726272590542,241.89726272590542,0,0,0,-125.68593526988494,206.68171517969364Z"></path><path d="M1.9594348786357652e-14,-320A320,320,0,1,1,-166.26686401133867,273.41420945487636L-140.52114753955055,231.0771824240226A270.4493615131253,270.4493615131253,0,1,0,1.6560247245424716e-14,-270.4493615131253Z"></path><path d="M-166.26686401133867,273.41420945487636A320,320,0,0,1,-5.878304635907295e-14,-320L-4.9680741736274145e-14,-270.4493615131253A270.4493615131253,270.4493615131253,0,0,0,-140.52114753955055,231.0771824240226Z"></path><path d="M1.9594348786357652e-14,-320A320,320,0,0,1,284.1232698887601,-147.2208120739687L263.04703407611544,-136.29998692291775A296.2624319272165,296.2624319272165,0,0,0,1.8140841948363815e-14,-296.2624319272165Z"></path><path d="M284.1232698887601,-147.2208120739687A320,320,0,0,1,261.43036576334146,184.53770307675745L242.03748731459143,170.8487146743211A296.2624319272165,296.2624319272165,0,0,0,263.04703407611544,-136.29998692291775Z"></path><path d="M261.43036576334146,184.53770307675745A320,320,0,0,1,-43.573327710798864,317.01950273162583L-40.34106260863389,293.5030276488385A296.2624319272165,296.2624319272165,0,0,0,242.03748731459143,170.8487146743211Z"></path><path d="M-43.573327710798864,317.01950273162583A320,320,0,0,1,-127.4883487507972,293.507616481745L-118.0312757603009,271.73525077513295A296.2624319272165,296.2624319272165,0,0,0,-40.34106260863389,293.5030276488385Z"></path><path d="M-127.4883487507972,293.507616481745A320,320,0,0,1,-166.26686401133867,273.41420945487636L-153.93320462784683,253.13237067674694A296.2624319272165,296.2624319272165,0,0,0,-118.0312757603009,271.73525077513295Z"></path><path d="M-166.26686401133867,273.41420945487636A320,320,0,0,1,-319.25400614097254,-21.837572276694736L-295.57177581822197,-20.217663343999824A296.2624319272165,296.2624319272165,0,0,0,-153.93320462784683,253.13237067674694Z"></path><path d="M-319.25400614097254,-21.837572276694736A320,320,0,0,1,-127.48834875079714,-293.507616481745L-118.03127576030086,-271.73525077513295A296.2624319272165,296.2624319272165,0,0,0,-295.57177581822197,-20.217663343999824Z"></path><path d="M-127.48834875079714,-293.507616481745A320,320,0,0,1,-43.57332771079881,-317.01950273162583L-40.341062608633834,-293.5030276488385A296.2624319272165,296.2624319272165,0,0,0,-118.03127576030086,-271.73525077513295Z"></path><path d="M-43.57332771079881,-317.01950273162583A320,320,0,0,1,2.254340479449671e-13,-320L2.0871137276053962e-13,-296.2624319272165A296.2624319272165,296.2624319272165,0,0,0,-40.341062608633834,-293.5030276488385Z"></path></g></svg> */}
            {/* <svg viewBox="-320 -320 640 640" style={{maxWidth: '640px', font: '12px sans-serif'}}><text textAnchor="middle" fill="#888" style={{visibility: 'hidden'}}><tspan className="percentage" x="0" y="0" dy="-0.1em" fontSize="3em"></tspan><tspan x="0" y="0" dy="1.5em">of visits begin with this sequence</tspan></text><g></g><g fill="none" pointerEvents="all"></g></svg> */}
        </Paper >
    )
}

export default FacilityEmissionChart