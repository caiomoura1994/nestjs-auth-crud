import { TodoItemDTO } from './todo-item.dto';

describe('TodoItemDTO', () => {
  it('should be defined', () => {
    expect(new TodoItemDTO()).toBeDefined();
  });
});
