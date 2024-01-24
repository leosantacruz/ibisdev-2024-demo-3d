import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Nodes() {
  const [data, setData] = useState([]);
  const [api, setApi] = useState(null);
  const [nodesHidden, setNodesHidden] = useState(true);


  const toggleNodes = () => {
    if (api) {
      if (nodesHidden) {
        showNodes();
      } else {
        hideNodes();
      }
      setNodesHidden(!nodesHidden);
    }
  };


  const hideNodes = () => {
    if (api) {
      api.getNodeMap((err, nodes) => {
        if (!err) {
          for (const nodeId in nodes) {
            if (nodeId === '82' || nodeId === '21' || nodeId === '162') {
              api.hide(nodeId, (err) => {
                if (!err) {
                  console.log('Hid node', nodeId);
                }
              });
            }
          }
        }
      });
    }
  };

  const showNodes = () => {
    if (api) {
      api.getNodeMap((err, nodes) => {
        if (!err) {
          for (const nodeId in nodes) {
            if (nodeId === '82' || nodeId === '21' || nodeId === '162') {
              api.show(nodeId, (err) => {

              });
            }
          }
        }
      });
    }
  };





  return (
    <div><div className="mt-4 md:w-1/4 border-l-2 border-blue-500">
      <div className="flex items-center">
        <label htmlFor="toggle-nodes-switch" className="mr-2 text-gray-700">
          Toggle Nodes
        </label>

        <div className="relative inline-block w-10 mr-2 align-middle select-none duration-200 ease-in">
          <input
            type="checkbox"
            id="toggle-nodes-switch"
            className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform transform"
            onClick={toggleNodes}
          />
          <label
            htmlFor="toggle-nodes-switch"
            className="block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer transition-transform transform"
          ></label>
        </div>
      </div>


    </div>
    </div>
  );
}

export default Nodes;


