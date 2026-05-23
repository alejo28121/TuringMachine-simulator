import {
    ReactFlow,
    Background,
    Controls,
    useReactFlow,
    ReactFlowProvider,
    useNodesState,
    useEdgesState
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useEffect } from 'react';

function Graph({ nodes: initialNodes, edges: initialEdges }) {

    const [nodes, setNodes, onNodesChange] =
        useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] =
        useEdgesState(initialEdges || []);

    const { fitView } = useReactFlow();

    useEffect(() => {

        const savedNodes = localStorage.getItem(
            'tm_graph_nodes'
        );

        if(savedNodes){

            const parsedNodes = JSON.parse(savedNodes);

            const mergedNodes = initialNodes.map((node) => {

                const savedNode = parsedNodes.find(
                    (n) => n.id === node.id
                );

                return savedNode
                    ? {
                        ...node,
                        position: savedNode.position
                    }
                    : node;
            });

            setNodes(mergedNodes);

        }else{

            setNodes(initialNodes);

        }

    }, [initialNodes, setNodes]);

    useEffect(() => {

        setEdges(initialEdges || []);

    }, [initialEdges, setEdges]);

    const saveNodePosition = (_, node) => {

        const updatedNodes = nodes.map((n) =>

            n.id === node.id
            ? {
                ...n,
                position: node.position
            }
            : n
        );

        setNodes(updatedNodes);

        localStorage.setItem(
            'tm_graph_nodes',
            JSON.stringify(updatedNodes)
        );
    };

    useEffect(() => {

        fitView({
            padding: 0.3,
            duration: 800
        });

    }, [fitView]);

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}

                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}

                onNodeDragStop={saveNodePosition}

                fitView

                proOptions={{
                    hideAttribution: true
                }}
            >
                <Background
                    gap={24}
                    size={1}
                    color='var(--primary-soft)'
                />

                <Controls />
            </ReactFlow>
        </div>
    );
}

function SimulationGraph(props){

    return(
        <ReactFlowProvider>
            <Graph
                nodes={props.nodes}
                edges={props.edges}
            />
        </ReactFlowProvider>
    );
}

export default SimulationGraph;