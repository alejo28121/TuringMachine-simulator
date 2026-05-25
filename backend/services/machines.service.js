const connection = require('../config/database.js');

exports.createMachine = async (data) => {

    const client = await connection.connect();

    try {
        await client.query('BEGIN');

        const {
            name,
            description,
            tape_alphabet,
            input_alphabet,
            blank_symbol,
            initial_state,
            accept_state,
            reject_state,
            states,
            transitions
        } = data;

        const machineResult = await client.query(`
            INSERT INTO machines (
                name,
                description,
                tape_alphabet,
                input_alphabet,
                blank_symbol,
                initial_state,
                accept_state,
                reject_state
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING id
        `, [
            name,
            description,
            tape_alphabet,
            input_alphabet,
            blank_symbol,
            initial_state,
            accept_state,
            reject_state
        ]);

        const machineId = machineResult.rows[0].id;

        for (const state of states) {
            await client.query(`
                INSERT INTO states (
                    machine_id,
                    name,
                    is_initial,
                    is_accept,
                    is_reject,
                    pos_x,
                    pos_y
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7)
            `, [
                machineId,
                state.name,
                state.is_initial,
                state.is_accept,
                state.is_reject,
                state.pos_x,
                state.pos_y
            ]);
        }
        for (const t of transitions) {
            await client.query(`
                INSERT INTO transitions (
                    machine_id,
                    current_state,
                    read_symbol,
                    write_symbol,
                    move_direction,
                    next_state
                )
                VALUES ($1,$2,$3,$4,$5,$6)
            `, [
                machineId,
                t.current_state,
                t.read_symbol,
                t.write_symbol,
                t.move_direction,
                t.next_state
            ]);
        }

        await client.query('COMMIT');

        return machineId;

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("SERVICE ERROR:", error);
        throw error;

    } finally {
        client.release();
    }
};