import Block from '../modules/Block';

export default function render(query: string, block: Block) {
  const root = document.querySelector(query) as HTMLElement;

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
