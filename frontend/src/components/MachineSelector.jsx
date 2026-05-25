import { TM_MACHINES } from '../data/tmMachines';
import { saveMachine } from '../services/tmMachineService';

export default function MachineSelector() {

    const handleSelect = (e) => {
        const machine = TM_MACHINES.find(m => m.id === e.target.value);

        if (!machine) return;

        saveMachine(machine);
    };

    return (
        <div className="Machine-selector">
            <select onChange={handleSelect}>
                <option value="">Selecciona una máquina</option>

                {TM_MACHINES.map(m => (
                    <option key={m.id} value={m.id}>
                        {m.name}
                    </option>
                ))}
            </select>
        </div>
    );
}