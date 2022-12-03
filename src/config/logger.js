const fs = require('fs');
const morgan = require('morgan');
const logrotate = require('logrotate-stream');
const path = require('path');
const intel = require('intel');

function resolveLogFolder() {
    const logsFolder = path.resolve('./logs');

    if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
    }

    return logsFolder;
}

const config = {
    path: resolveLogFolder(),
    size: '10m',
    keep: 10,
    level: intel.DEBUG,
};


function getLogrotateStream(filename) {
    return logrotate({
        file: path.join(config.path, filename),
        size: config.size,
        keep: config.keep,
    });
}


function enableMorganLogger(app) {
    app.use(morgan('combined', {
        stream: logrotate({
            file: path.join(config.path, 'access.log'),
            size: config.size,
            keep: config.keep,
        }),
    }));
}


function enableIntelLogger() {
    intel.setLevel(config.level);

    const fileFormatter = new intel.Formatter({
        format: '[%(date)s] [%(levelname)s] %(name)s - %(message)s',
    });

    const consoleFormatter = new intel.Formatter({
        format: '[%(date)s] [%(levelname)s] %(name)s - %(message)s',
        colorize: true,
    });

    intel.addHandler(new intel.handlers.Console({
        formatter: consoleFormatter,
    }));

    intel.addHandler(new intel.handlers.Stream({
        stream: getLogrotateStream('debug.log'),
        formatter: fileFormatter,
    }));

    intel.addHandler(new intel.handlers.Stream({
        level: intel.INFO,
        stream: getLogrotateStream('info.log'),
        formatter: fileFormatter,
    }));

    intel.addHandler(new intel.handlers.Stream({
        level: intel.WARN,
        stream: getLogrotateStream('error.log'),
        formatter: fileFormatter,
    }));
}

module.exports = {
    init(app) {
        enableMorganLogger(app);
        enableIntelLogger();
    },
};
