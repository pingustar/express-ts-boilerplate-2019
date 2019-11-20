import 'reflect-metadata';
import app from '@server';
import { logger } from '@shared';
import {Connection, createConnection} from 'typeorm';

// create typeorm connection
createConnection({
    type: 'mysql',
    host: '192.168.178.69',
    port: 3306,
    username: 'root',
    password: 'rootpw',
    database: 'hocusdb',
    entities: ['src/entities/**/*.ts'],
    logging: true,
    synchronize: true,
}).then((connection: Connection) => {
    const isConnected: boolean = connection.isConnected;
    logger.info('DB connected: ' + isConnected);

    // Start the server
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });
});
