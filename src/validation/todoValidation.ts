import {z} from 'zod';


const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  completed: z.boolean().optional(),
});
export type TodoSchema = z.infer<typeof todoSchema>;
