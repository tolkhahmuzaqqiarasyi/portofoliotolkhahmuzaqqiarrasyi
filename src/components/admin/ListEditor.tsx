import React, { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, PlusIcon, Trash2Icon } from 'lucide-react';

interface ListEditorProps<T extends {id: string;}> {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  itemTitle: (item: T, index: number) => string;
  renderItem: (item: T, patch: (p: Partial<T>) => void) => React.ReactNode;
  addLabel: string;
  emptyText: string;
}

const iconBtn =
'grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-surface-2 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent';

export function ListEditor<T extends {id: string;}>({ items, onChange, createItem, itemTitle, renderItem, addLabel, emptyText }: ListEditorProps<T>) {
  const [openId, setOpenId] = useState<string | null>(null);

  const patch = (id: string, p: Partial<T>) => onChange(items.map((it) => it.id === id ? { ...it, ...p } : it));
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const remove = (i: number) => {
    if (!window.confirm(`Hapus "${itemTitle(items[i], i)}"?`)) return;
    onChange(items.filter((_, idx) => idx !== i));
  };
  const add = () => {
    const item = createItem();
    onChange([...items, item]);
    setOpenId(item.id);
  };

  return (
    <div>
      {items.length === 0 ?
      <p className="rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">{emptyText}</p> :

      <ul className="space-y-3">
          {items.map((item, i) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className="rounded-2xl border border-line bg-surface">
                <div className="flex items-center gap-1 p-2 pl-4">
                  <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex min-h-[44px] flex-1 items-center gap-3 text-left">
                  
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-2 text-xs font-bold text-ink">{i + 1}</span>
                    <span className="line-clamp-1 font-semibold text-ink">{itemTitle(item, i) || 'Tanpa judul'}</span>
                    <ChevronDownIcon className={`ml-auto h-4 w-4 shrink-0 text-muted transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Pindah ke atas" className={iconBtn}>
                    <ArrowUpIcon className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Pindah ke bawah" className={iconBtn}>
                    <ArrowDownIcon className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => remove(i)} aria-label="Hapus" className={`${iconBtn} hover:!text-danger`}>
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </div>
                {open && <div className="grid gap-4 border-t border-line p-5">{renderItem(item, (p) => patch(item.id, p))}</div>}
              </li>);

        })}
        </ul>
      }
      <button
        type="button"
        onClick={add}
        className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line text-sm font-bold text-primary-ink transition-colors duration-150 ease-out hover:border-primary/60">
        
        <PlusIcon className="h-4 w-4" aria-hidden /> {addLabel}
      </button>
    </div>);

}