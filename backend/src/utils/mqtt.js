export const PORT = 1883;
export const CLIENT_ID = `mqttjs_${Math.random().toString(16).substr(2, 6)}`;
export const HOST = `mqtt://broker.emqx.io`;
export const USERNAME_MQTT = "mqttusername_fire";
export const PASSWORD_MQTT = process.env.PASSWORD_MQTT
