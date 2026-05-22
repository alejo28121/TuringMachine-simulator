import {
    ReactFlow,
    Background,
    Controls,
    useReactFlow,
    ReactFlowProvider
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useEffect } from 'react';

function Graph({ nodes, edges }) {

    const { fitView } = useReactFlow();

    useEffect(() => {
        fitView({
            padding: 0.3,
            duration: 800
        });
    }, [nodes, edges, fitView]);

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
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