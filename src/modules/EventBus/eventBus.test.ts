import EventBus from '.';

describe('EventBus', () => {
  const eventBus = new EventBus();
  const { listeners } = eventBus;

  it('testing eventbus', () => {
    eventBus.on('change', () => 111);

    eventBus.emit('change');

    expect(listeners).toHaveProperty('change');
  });
});
