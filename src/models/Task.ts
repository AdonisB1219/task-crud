// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'Los parámetros no son válidos para el objeto Task';


// **** Types **** //

export interface ITask {
  id: number;
  name: string;
  description: string;
  status: string;
  icon: string
}


// **** Functions **** //

/**
 * Create new task.
 */
function new_(
  name?: string,
  description?: string,
  status?: string,
  icon?: string,
  id?: number,
): ITask {
  return {
    id: (id ?? -1),
    name: (name ?? ''),
    description: (description ?? ''),
    status: (status ?? ''),
    icon: (icon ?? ''),
  };
}

/**
 * Get task instance from object.
 */
function from(param: object): ITask {
  if (!isTask(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as ITask;
  return new_(p.name, p.description, p.status, p.icon);
}

/**
 * See if the param meets criteria to be a task.
 */
function isTask(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'name' in arg && typeof arg.name === 'string' && 
    'description' in arg && typeof arg.description === 'string' && 
    'status' in arg && typeof arg.status === 'string' &&
    'icon' in arg && typeof arg.icon === 'string'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isTask,
} as const;
