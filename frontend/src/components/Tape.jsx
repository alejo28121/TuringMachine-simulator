import '../assets/tape.css';

import { useState, useEffect } from 'react';

import {
    Save,
    Rows3,
    MoveRight,
    CircleSlash
} from 'lucide-react';

function Tape(){

    const [tape, setTape] = useState(() => {

        const savedTape = localStorage.getItem(
            'tm_tape'
        );

        return savedTape
            ? JSON.parse(savedTape)
            : {
                input: '',
                blankSymbol: 'B',
                headPosition: 0
            };
    });

    useEffect(() => {

        localStorage.setItem(
            'tm_tape',
            JSON.stringify(tape)
        );

    }, [tape]);

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        if(name === 'blankSymbol'){

            setTape({
                ...tape,
                blankSymbol: value.slice(0,1)
            });

            return;
        }

        if(name === 'headPosition'){

            const position = Number(value);

            setTape({
                ...tape,
                headPosition:
                    position < 0
                    ? 0
                    : position
            });

            return;
        }

        setTape({
            ...tape,
            [name]: value
        });
    };

    const tapeArray = (
        tape.input + tape.blankSymbol.repeat(5)
    ).split('');

    const leftInfinite = Array(7).fill(
        tape.blankSymbol
    );

    const rightInfinite = Array(2).fill(
        tape.blankSymbol
    );

    const fullTape = [
        ...leftInfinite,
        ...tapeArray,
        ...rightInfinite
    ];

    const visualHeadPosition =
        tape.headPosition + leftInfinite.length;
    return(
        <div className='Main-tape-container'>
            <div className='Header-tape'>
                <div>
                    <span className='Title-tape'>
                        Cinta
                    </span>
                    <p className='Description-tape'>
                        Configura la cinta inicial
                        de la Máquina de Turing.
                    </p>
                </div>
            </div>
            <div className='Tape-config-container'>
                <div className='Input-group-tape'>
                    <label className='Label-tape'>
                        Contenido inicial
                    </label>
                    <input
                        className='Input-tape'
                        placeholder='Ej: 10101'
                        name='input'
                        value={tape.input}
                        onChange={handleChange}
                    />
                </div>
                <div className='Input-group-tape'>
                    <label className='Label-tape'>
                        Símbolo blanco
                    </label>
                    <input
                        className='Input-tape small'
                        maxLength={1}
                        name='blankSymbol'
                        value={tape.blankSymbol}
                        onChange={handleChange}
                    />
                </div>
                <div className='Input-group-tape'>
                    <label className='Label-tape'>
                        Posición inicial
                    </label>
                    <input
                        className='Input-tape small'
                        type='number'
                        min='0'
                        name='headPosition'
                        value={tape.headPosition}
                        onChange={handleChange}
                    />
                </div>
                <button className='Button-save-tape'>
                    <Save size={18}/>
                    Guardado automático
                </button>
            </div>
            <div className='Tape-preview-container'>
                <div className='Tape-preview-header'>
                    <Rows3 size={18}/>
                    <span>
                        Vista previa de la cinta
                    </span>
                </div>
                <div className='Tape-cells-container'>
                    {fullTape.map((symbol, index) => {
                        const distanceFromEdge = Math.min(
                            index,
                            fullTape.length - 1 - index
                        );
                        return(
                            <div
                                key={index}
                                className={`Tape-cell ${
                                    index === visualHeadPosition
                                    ? 'active'
                                    : ''
                                }`}
                                style={{
                                    opacity:
                                        distanceFromEdge <= 2
                                        ? 0.25 + (distanceFromEdge * 0.25)
                                        : 1,
                                    transform:
                                        distanceFromEdge === 0
                                        ? 'scale(0.82)'
                                        : distanceFromEdge === 1
                                        ? 'scale(0.9)'
                                        : 'scale(1)'
                                }}
                            >
                                <span>
                                    {
                                        symbol === tape.blankSymbol
                                        ? <CircleSlash size={14}/>
                                        : symbol
                                    }
                                </span>
                                {index === visualHeadPosition && (
                                    <div className='Head-indicator'>
                                        <MoveRight size={14}/>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Tape;