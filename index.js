
import { ServiceBusClient } from '@azure/service-bus';


const from_environment = n => process.env[n];
const service_bus_connection = new ServiceBusClient(from_environment('AimsServiceBusConnection'));

export default async(context, message, config) => {
    const now = Date.now();

    console.log({ env: message.environmentId, message: message.name, node_id: message.id });

    const node = {
        id: +(message.id),
        environment: message.environmentId,
        name: message.name,
        type: message.nodeTypeDisplayName,
        status_id: `${message.statusName}`,
        status: `${message.statusDisplayName}`,
        system_id: +(message.systemId),
        type_id: message.nodeTypeName,
        system: message.systemName,

        system_type: system_types.length !== 0 ? system_types[0].name : '',
        system_type_id: message.agentId,
        score: { $cond: [ { $not: ['$score'] }, 100, '$score' ] },
        groups: { $cond: [ { $not: ['$groups'] }, 0, '$groups' ] }
    };
    console.log(node)

};
