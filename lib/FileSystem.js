const fs = require('fs');

module.exports = {
    getModuleFolderPath: (config, moduleName) => {
        const modulesPath = config.get('paths.modules');
        return `${modulesPath}/${moduleName}`;
    },
    concat: (files) => {
        return Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(file, (err, contents) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(contents.toString());
                        }
                    });
                });
            })
        ).then((contents) => {
            return contents.join('');
        });
    }
};
