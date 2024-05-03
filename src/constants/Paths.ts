/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Tasks: {
    Base: '/tasks',
    Unique: '/:id',
    Generic: '/',
  },
} as const;
