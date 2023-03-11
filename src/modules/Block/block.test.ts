import render from '../../utils/renderDom';
import Button from '../../components/Button';

describe('Block methods', () => {
  const button = new Button({
    attr: {
      type: 'submit',
    },
    text: 'Сохранить',
  });

  document.body.innerHTML = '<div id="btn"></div>';
  render('#btn', button);

  test('render', () => {
    const component = button.getContent();
    expect(component.textContent).toBe('Сохранить');
  });

  test('testing componentDidUpdate', () => {
    const newText = 'Component did updated';
    button.setProps({ text: newText });

    const changedComponent = button.getContent();

    expect(changedComponent.textContent).toBe(newText);
  });
});

describe('Testing events', () => {
  let count = 0;
  const button = new Button({
    attr: {
      type: 'submit',
    },
    text: 'Сохранить',
    onClick: () => {
      count += 1;
    },
  });

  test('handle click', () => {
    const btn = button.getContent();
    btn.click();
    btn.click();
    expect(count).toBe(2);
  });
});
