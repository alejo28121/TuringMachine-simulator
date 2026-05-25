import { TM_MACHINES } from '../data/tmMachines';

const STORAGE_KEY = 'tm_machine';

export function saveMachine(machine) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(machine));

    // 🔥 importante: notificar cambios
    window.dispatchEvent(new Event('tm-machine-changed'));
}

export function loadMachine() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) return JSON.parse(saved);

    return TM_MACHINES[0]; // default
}

export function getAllMachines() {
    return TM_MACHINES;
}

export function getMachineById(id) {
    return TM_MACHINES.find(m => m.id === id);
}