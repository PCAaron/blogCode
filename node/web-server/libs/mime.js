const _mime = {
    'text/plain': ['txt'],
    'text/html': ['html', 'htm'],
    'text/css': ['css'],
    'image/png': ['png'],
    'image/jpeg': ['jpg']
}

module.exports = {
    getType(ext) {
        let _key
        Object.keys(_mime).forEach(key => {
            if (_mime[key].includes(ext)) {
                _key = key
            }
        })
        return _key
    },
    getExension (type) {
        return _mime[type]
    }
}