import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Bell, PlusCircle, Trash2, AlertTriangle, Edit2, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog.jsx";

const LocalReminderTool = () => {
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');
  const [editingReminderId, setEditingReminderId] = useState(null);
  const { toast } = useToast();

  // Load reminders from localStorage
  useEffect(() => {
    const storedReminders = localStorage.getItem('localReminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders).map(r => ({...r, dateTime: new Date(r.dateTime)}))); // Parse dates
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('localReminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check for due reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (!reminder.notified && reminder.dateTime <= now) {
          showNotification(reminder);
          setReminders(prev => prev.map(r => r.id === reminder.id ? { ...r, notified: true } : r));
        }
      });
    };

    const intervalId = setInterval(checkReminders, 15000); // Check every 15 seconds
    return () => clearInterval(intervalId);
  }, [reminders]);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({ title: "Notifications Not Supported", description: "This browser does not support desktop notifications.", variant: "destructive" });
      return false;
    } else if (Notification.permission === "granted") {
      return true;
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        return true;
      }
    }
    toast({ title: "Notification Permission Denied", description: "Please enable notifications in your browser settings.", variant: "destructive" });
    return false;
  };

  const showNotification = (reminder) => {
    if (Notification.permission === "granted") {
      new Notification("Reminder: " + reminder.title, {
        body: `It's time for your reminder set for ${reminder.dateTime.toLocaleTimeString()}`,
        icon: '/logo.png' // Optional: Add an icon path
      });
    }
  };

  const handleAddOrUpdateReminder = async () => {
    if (!reminderTitle.trim() || !reminderDateTime) {
      toast({ title: "Missing Information", description: "Please provide a title and date/time.", variant: "destructive" });
      return;
    }
    
    const hasPermission = await requestNotificationPermission();
    // We can proceed even if permission is denied, just won't show desktop notification

    const newDateTime = new Date(reminderDateTime);
    if (newDateTime <= new Date() && !editingReminderId) {
        toast({ title: "Invalid Time", description: "Reminder time must be in the future.", variant: "destructive"});
        return;
    }

    if (editingReminderId) {
      setReminders(reminders.map(r => r.id === editingReminderId ? { ...r, title: reminderTitle, dateTime: newDateTime, notified: newDateTime <= new Date() } : r));
      toast({ title: "Reminder Updated!", action: <CheckCircle className="text-green-500"/> });
    } else {
      setReminders([...reminders, { id: crypto.randomUUID(), title: reminderTitle, dateTime: newDateTime, notified: false }]);
      toast({ title: "Reminder Set!", action: <CheckCircle className="text-green-500"/> });
    }
    
    setEditingReminderId(null);
    setReminderTitle('');
    setReminderDateTime('');
    setIsModalOpen(false);
  };

  const openEditModal = (reminder) => {
    setEditingReminderId(reminder.id);
    setReminderTitle(reminder.title);
    setReminderDateTime(new Date(reminder.dateTime.getTime() - reminder.dateTime.getTimezoneOffset() * 60000).toISOString().slice(0, 16)); // Adjust for local ISO string
    setIsModalOpen(true);
  };
  
  const openNewModal = () => {
    setEditingReminderId(null);
    setReminderTitle('');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Default to 30 mins in future
    setReminderDateTime(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
    setIsModalOpen(true);
  }


  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast({ title: "Reminder Deleted", variant: "destructive" });
  };

  const upcomingReminders = reminders.filter(r => !r.notified && r.dateTime > new Date()).sort((a,b) => a.dateTime - b.dateTime);
  const pastReminders = reminders.filter(r => r.notified || r.dateTime <= new Date()).sort((a,b) => b.dateTime - a.dateTime);


  return (
    <>
      <Helmet>
        <title>Local Reminder Tool | Toolzenix</title>
        <meta name="description" content="Set local browser notifications and reminders for important tasks or events. Data stays in your browser." />
        <link rel="canonical" href="https://toolzenix.com/local-reminder-tool" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Bell className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Local Reminder Tool
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Set reminders with browser notifications. All data is stored locally.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Button onClick={openNewModal} className="w-full mb-8 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-3 text-lg">
            <PlusCircle className="w-5 h-5 mr-2" /> Add New Reminder
          </Button>

          {reminders.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No reminders set yet. Add one to get started!</p>
          )}
          
          {upcomingReminders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Upcoming Reminders</h2>
              <div className="space-y-3">
                {upcomingReminders.map(r => (
                  <motion.div
                    key={r.id} layout
                    initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{r.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{r.dateTime.toLocaleString()}</p>
                    </div>
                    <div className="space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(r)} className="text-blue-500 hover:text-blue-700"><Edit2 size={18}/></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteReminder(r.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {pastReminders.length > 0 && (
             <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Past/Notified Reminders</h2>
              <div className="space-y-3">
                {pastReminders.map(r => (
                  <motion.div
                    key={r.id} layout
                    initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }}
                    className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm flex justify-between items-center opacity-70"
                  >
                    <div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300 line-through">{r.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{r.dateTime.toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteReminder(r.id)} className="text-red-500 hover:text-red-700 opacity-50 hover:opacity-100"><Trash2 size={18}/></Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">{editingReminderId ? 'Edit Reminder' : 'Add New Reminder'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="reminder-title" className="text-gray-700 dark:text-gray-300">Title</Label>
                <Input id="reminder-title" value={reminderTitle} onChange={e => setReminderTitle(e.target.value)} placeholder="e.g., Meeting with team" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="reminder-datetime" className="text-gray-700 dark:text-gray-300">Date & Time</Label>
                <Input id="reminder-datetime" type="datetime-local" value={reminderDateTime} onChange={e => setReminderDateTime(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddOrUpdateReminder} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white">
                {editingReminderId ? 'Update Reminder' : 'Set Reminder'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Important Notes:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>This tool uses your browser's local storage to save reminders. They are not stored online.</li>
            <li>Clearing your browser cache or using a different browser/device will mean your reminders are not available.</li>
            <li>Browser notifications require your permission. If permission is not granted, reminders will still be tracked here but won't pop up as desktop notifications.</li>
            <li>For notifications to trigger, your browser (though not necessarily this specific tab) generally needs to be running. Reliability can vary between browsers.</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default LocalReminderTool;