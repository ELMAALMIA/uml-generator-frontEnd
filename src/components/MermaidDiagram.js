// src/components/MermaidDiagram.js
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

function MermaidDiagram({ definition }) {
    const mermaidRef = useRef(null);

    useEffect(() => {
        if (mermaidRef.current) {
            // Initialize Mermaid and render the diagram
            mermaid.initialize({ startOnLoad: true });
            mermaid.contentLoaded();
        }
    }, [definition]);

    return (
        <div ref={mermaidRef}>
            <div className="mermaid">{definition}</div>
        </div>
    );
}

export default MermaidDiagram;
