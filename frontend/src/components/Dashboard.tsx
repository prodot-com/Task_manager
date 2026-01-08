import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, CheckCircle2, Circle, 
  LayoutDashboard, LogOut, X, Edit3, 
  AlertTriangle, Info, CheckCircle
} from "lucide-react";
import { getTasks, createTask, deleteTask, updateTask } from "../api/taskapi";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      showToast("Failed to sync workspace", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        showToast("Task updated successfully");
      } else {
        await createTask({ ...formData, status: "pending" });
        showToast("New task created");
      }
      setIsModalOpen(false);
      loadTasks();
    } catch (err) {
      showToast("Operation failed", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const taskId = deleteConfirm;
    
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setDeleteConfirm(null);

    try {
      await deleteTask(taskId);
      showToast("Task permanently removed");
    } catch (err) {
      loadTasks(); 
      showToast("Error deleting task", "error");
    }
  };

  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

    try {
      await updateTask(task.id, { status: newStatus });
    } catch (err) {
      loadTasks();
      showToast("Status update failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 hidden lg:flex flex-col bg-black">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <CheckCircle2 className="text-black w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">Nexus</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-zinc-900 text-white rounded-xl text-sm font-semibold border border-zinc-700/50">
            <LayoutDashboard size={18} /> My Workspace
          </button>
        </nav>
        <div className="p-6 border-t border-zinc-900">
          <button onClick={() => dispatch(logout())} className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-6 py-12 lg:px-20 relative">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-black tracking-tighter">Sprint Backlog</h1>
            <button 
              onClick={() => { setEditingTask(null); setFormData({title:"", description:""}); setIsModalOpen(true); }}
              className="bg-white text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all"
            >
              <Plus size={18} /> CREATE
            </button>
          </header>

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={() => toggleStatus(task)}
                onDelete={() => setDeleteConfirm(task.id)}
                onEdit={() => { setEditingTask(task); setFormData({title:task.title, description:task.description||""}); setIsModalOpen(true); }}
              />
            ))}
          </div>
        </div>
      </main>


      <AnimatePresence>
        {isModalOpen && (
          <ModalWrapper onClose={() => setIsModalOpen(false)}>
            <form onSubmit={handleSubmit} className="p-10">
              <h2 className="text-2xl font-black tracking-tighter mb-8">{editingTask ? 'EDIT_TASK' : 'NEW_TASK'}</h2>
              <div className="space-y-6">
                <input 
                  required value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Task title..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-zinc-500 text-white"
                />
                <textarea 
                  rows={4} value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Details (Optional)..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-zinc-500 text-white resize-none"
                />
              </div>
              <div className="mt-10 flex gap-4">
                <button type="submit" className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-zinc-200 transition-all">SAVE</button>
              </div>
            </form>
          </ModalWrapper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <ModalWrapper onClose={() => setDeleteConfirm(null)}>
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter mb-2">REMOVE_TASK?</h2>
              <p className="text-zinc-500 text-sm mb-10 leading-relaxed">This action cannot be undone. The task will be permanently deleted from the Nexus servers.</p>
              <div className="flex gap-4">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 text-zinc-500 font-bold hover:text-white transition-colors">CANCEL</button>
                <button onClick={confirmDelete} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-500 transition-all shadow-lg shadow-red-900/20">DELETE</button>
              </div>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl"
          >
            {toast.type === 'success' ? <CheckCircle className="text-green-500" size={20} /> : <Info className="text-red-500" size={20} />}
            <span className="text-sm font-bold tracking-tight">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const ModalWrapper = ({ children, onClose }: any) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      className="bg-[#0c0c0e] border border-zinc-800 w-full max-w-md rounded-[2.5rem] overflow-hidden relative"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-zinc-600 hover:text-white"><X size={20}/></button>
      {children}
    </motion.div>
  </div>
);

const TaskCard = ({ task, onToggle, onDelete, onEdit }: any) => {
  const isCompleted = task.status === 'completed';
  return (
    <motion.div 
      layout className={`group flex items-start gap-5 p-6 border rounded-[1.5rem] transition-all duration-500 ${isCompleted ? "bg-zinc-900/10 border-zinc-900 opacity-50" : "bg-zinc-900/20 border-zinc-800 hover:border-zinc-700"}`}
    >
      <button onClick={onToggle}>{isCompleted ? <CheckCircle2 size={24} className="text-zinc-600" /> : <Circle size={24} className="text-zinc-700 hover:text-white" />}</button>
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-lg leading-tight ${isCompleted ? 'text-zinc-600 line-through' : 'text-zinc-100'}`}>{task.title}</h3>
        {task.description && <p className="text-sm mt-1 text-zinc-500 line-clamp-1">{task.description}</p>}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-2 text-zinc-500 hover:text-white"><Edit3 size={18} /></button>
        <button onClick={onDelete} className="p-2 text-zinc-500 hover:text-red-500"><Trash2 size={18} /></button>
      </div>
    </motion.div>
  );
};

export default Dashboard;