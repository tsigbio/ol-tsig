var err = {
    err_100: 'Escalas mal definidas en "LayerScale".',
    desconocido: 'Error no Definido.'
};

class OlTsError extends Error {
    /**
     * @param {number} code Error code.
     */
    constructor(code) {
        const message = 'Error ' + code + '. ' + (err['err_' + code] || err.desconocido);
        super(message);
        this.code = code;
        this.name = 'TsigError';
        // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
        this.message = message;
    }
}

export default OlTsError;
