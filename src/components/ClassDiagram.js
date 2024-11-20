// src/components/ClassDiagram.js
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

function ClassDiagram({ classes }) {
    const mermaidRef = useRef(null);

    // Helper function to convert access modifiers
    const convertAccessModifier = (modifier) => {
        switch (modifier) {
            case 'private':
                return '-';
            case 'protected':
                return '#';
            case 'public':
                return '+';
            default:
                return '~'; // Package-private or unspecified
        }
    };

    // Generate Mermaid diagram definition from class data
    const generateMermaidDefinition = () => {
        let diagram = "classDiagram\n";

        classes.forEach((classInfo) => {
            // Add class name
            diagram += `class ${classInfo.className} {\n`;

            // Add attributes
            classInfo.attributes.forEach((attr) => {
                const accessModifier = convertAccessModifier(attr.accessModifier);
                diagram += `  ${accessModifier} ${attr.dataType} ${attr.name}\n`;
            });

            // Add methods
            classInfo.methods.forEach((method) => {
                const accessModifier = convertAccessModifier(method.accessModifier);
                const params = method.parameters.join(", ");
                diagram += `  ${accessModifier} ${method.methodName}(${params}): ${method.returnType}\n`;
            });

            diagram += "}\n";

            // Add inheritance (superclass) if it exists
            if (classInfo.superClass) {
                diagram += `${classInfo.superClass} <|-- ${classInfo.className}\n`;
            }

            // Add implemented interfaces
            classInfo.interfaces.forEach((interfaceName) => {
                diagram += `${classInfo.className} --|> ${interfaceName}\n`;
            });
        });

        return diagram;
    };

    useEffect(() => {
        // Initialize Mermaid and render the diagram
        if (mermaidRef.current) {
            mermaid.initialize({ startOnLoad: true });
            mermaid.contentLoaded();
        }
    }, [classes]);

    // Mermaid diagram definition
    const mermaidDefinition = generateMermaidDefinition();

    return (
        <div className="p-4 border rounded-lg bg-gray-100">
            <div className="mermaid" ref={mermaidRef}>
                {mermaidDefinition}
            </div>
        </div>
    );
}

export default ClassDiagram;
