interface ToastMessage {
  msg: string;
  type?: 'success' | 'error' | 'info';
  id?: number;
}

const toasts = ref<ToastMessage[]>([]);

const add = ({ msg, type = 'success' }: ToastMessage) => {
  const id = Date.now(); // Unique ID for the toast
  toasts.value.push({ msg, type, id });

  // Auto-remove after 3 seconds
  setTimeout(() => {
    remove(id);
  }, 3000);
};

const remove = (id: number) => {
  toasts.value = toasts.value.filter(toast => toast.id !== id);
};

export function useToast() {
  return { toasts, add, remove };
}
