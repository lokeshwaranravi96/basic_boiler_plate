import { findAllTask } from "../../../../../interactors/task_managements/index.js";

export const listTasksHandler = async (req, reply) => {
    return new Promise((resolve, reject) => {
        try {
            const {offset,limit,search=''}= req.query;
            findAllTask({offset,limit,search})
            .then(result => {
                return resolve(result);
            })
            .catch(error => {
                return reject(error);
            })
        
        } catch (error) {
            return reject(error);
        }
    })
};