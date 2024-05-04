/**
 * Express router paths.
 */

export default {
  Base: '/api',
  Tasks: {
    Base: '/tasks',
    Unique: '/:id',
    Generic: '/',
  },
} as const;
