import { nanoid } from 'nanoid';
import logo from './assets/logo.svg';
import { useRef, useState } from 'react';
import Item from './components/Item';

export type Item = {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
}

function App() {

  const [items, setItems] = useState<Item[]>([
    {id: nanoid(), name: 'Leite', quantity: '3', completed: false},
    {id: nanoid(), name: 'Banana', quantity: '3', completed: true}
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  
  const completedItems = items.filter(item => item.completed);
  const notCompletedItems = items.filter(item => !item.completed);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formEl = e.currentTarget;
    const formData = new FormData(formEl)

    const name = formData.get('name') as string;
    const quantity = formData.get('quantity') as string;
    
    const item: Item = {
      id: nanoid(),
      name,
      quantity,
      completed: false,
    }

    //inserir no estado
    const newItems = [item, ...items]
    setItems(newItems);

    //rseetar o formulario
    formEl.reset();

    // dar foco no primeiro input
    inputRef.current && inputRef.current.focus();
  }

  function handleClickComplete(id: string) {
    const newItems = items.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });

    setItems(newItems);
  }

  function handleClickDelete(id: string) {
    const newitems = items.filter(item => item.id !== id) 
    setItems(newitems);
  }

  return (
    <main className="max-w-2xl px-6 py-12 pb-20 mx-auto my-10 bg-white md:my-20 md:px-32 md:rounded-3xl">
      <header className="text-center">
        <img src={logo} alt="logotipo" className="mx-auto" />
        <h1 className="mt-4 text-3xl font-medium font-display">
          Lista de Compras
        </h1>
        <p className="text-sm text-slate-500">
          Facilite sua ida ao supermercado!
        </p>
        <hr className="w-1/3 mx-auto mt-6 mb-8" />
      </header>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="flex-shrink">
          <label htmlFor="name" className="block text-xs text-slate-400">
            Item
          </label>
          <input
            ref={inputRef}
            type="text"
            id="name"
            name='name'
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <div className="flex-shrink">
          <label htmlFor="quantity" className="block text-xs text-slate-400">
            Quantidade
          </label>
          <input
            type="text"
            id="quantity"
            name='quantity'
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <button className="self-end flex-shrink h-10 px-4 font-extrabold text-white rounded-lg bg-fuchsia-300">
          +
        </button>
      </form>
      <section className="mt-10 space-y-3 ">
        {notCompletedItems.map(item => (
            <Item handleClickDelete={handleClickDelete} handleClickComplete={handleClickComplete} key={item.id} item={item}/>
        ))}
      </section>
      <section className="mt-16 space-y-3">
        <h2 className="mb-10 text-2xl text-center font-display">Itens já comprados</h2>
      {completedItems.map(item => (
            <Item handleClickDelete={handleClickDelete} handleClickComplete={handleClickComplete} key={item.id} item={item}/>
        ))}
      </section>
    </main>
  );
}

export default App;
