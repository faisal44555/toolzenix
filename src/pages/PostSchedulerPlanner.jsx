import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CalendarDays, PlusCircle, Edit2, Trash2, ChevronLeft, ChevronRight, Save, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog.jsx";

const PostSchedulerPlanner = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState({}); // Format: { 'YYYY-MM-DD': [{id: uuid, text: '', time: '', platform: ''}, ...] }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [eventTime, setEventTime] = useState('10:00');
  const [eventPlatform, setEventPlatform] = useState('Instagram');
  const [editingEventId, setEditingEventId] = useState(null); // To edit existing event
  const { toast } = useToast();

  useEffect(() => {
    const storedEvents = localStorage.getItem('socialPlannerEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('socialPlannerEvents', JSON.stringify(events));
  }, [events]);

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 (Sun) - 6 (Sat)

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const openModalForDate = (date) => {
    setSelectedDate(date);
    setEventText('');
    setEventTime('10:00');
    setEventPlatform('Instagram');
    setEditingEventId(null);
    setIsModalOpen(true);
  };
  
  const openModalForEdit = (date, event) => {
    setSelectedDate(date);
    setEventText(event.text);
    setEventTime(event.time);
    setEventPlatform(event.platform);
    setEditingEventId(event.id);
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (!eventText.trim()) {
      toast({ title: 'Event text cannot be empty', variant: 'destructive', action: <AlertTriangle /> });
      return;
    }
    const dateKey = selectedDate.toISOString().split('T')[0];
    const newEvent = { 
      id: editingEventId || crypto.randomUUID(), 
      text: eventText, 
      time: eventTime, 
      platform: eventPlatform 
    };

    setEvents(prevEvents => {
      const dayEvents = prevEvents[dateKey] ? [...prevEvents[dateKey]] : [];
      if (editingEventId) {
        const eventIndex = dayEvents.findIndex(e => e.id === editingEventId);
        if (eventIndex > -1) {
          dayEvents[eventIndex] = newEvent;
        }
      } else {
        dayEvents.push(newEvent);
      }
      dayEvents.sort((a,b) => a.time.localeCompare(b.time)); // Sort events by time
      return { ...prevEvents, [dateKey]: dayEvents };
    });

    setIsModalOpen(false);
    setEditingEventId(null);
    toast({ title: `Event ${editingEventId ? 'Updated' : 'Saved'}!`, description: `Post scheduled for ${eventPlatform} on ${dateKey} at ${eventTime}.` });
  };
  
  const handleDeleteEvent = (dateKey, eventId) => {
     setEvents(prevEvents => {
      const dayEvents = prevEvents[dateKey] ? prevEvents[dateKey].filter(e => e.id !== eventId) : [];
      if (dayEvents.length === 0) {
        const { [dateKey]: _, ...rest } = prevEvents; // Remove dateKey if no events left
        return rest;
      }
      return { ...prevEvents, [dateKey]: dayEvents };
    });
    toast({ title: 'Event Deleted', variant: 'destructive' });
  };

  const renderCalendar = () => {
    const numDays = daysInMonth(currentMonth);
    const offset = firstDayOfMonth(currentMonth);
    const cells = [];

    for (let i = 0; i < offset; i++) {
      cells.push(<div key={`empty-${i}`} className="border dark:border-gray-700 p-1 h-28"></div>);
    }

    for (let day = 1; day <= numDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateKey = date.toISOString().split('T')[0];
      const dayEvents = events[dateKey] || [];
      const isToday = new Date().toDateString() === date.toDateString();

      cells.push(
        <div key={day} className={`border dark:border-gray-700 p-2 h-32 sm:h-40 flex flex-col relative ${isToday ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-white dark:bg-gray-800'}`}>
          <span className={`font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-7700 dark:text-gray-200'}`}>{day}</span>
          <div className="flex-grow overflow-y-auto text-xs mt-1 space-y-1">
            {dayEvents.map(event => (
              <div key={event.id} className={`p-1 rounded-md ${
                event.platform === 'Instagram' ? 'bg-pink-100 dark:bg-pink-800/70' :
                event.platform === 'Facebook' ? 'bg-blue-100 dark:bg-blue-800/70' :
                event.platform === 'Twitter' ? 'bg-sky-100 dark:bg-sky-800/70' :
                event.platform === 'LinkedIn' ? 'bg-indigo-100 dark:bg-indigo-800/70' :
                'bg-gray-100 dark:bg-gray-700/70'
              }`}>
                <p className="font-semibold truncate text-gray-800 dark:text-gray-100">{event.platform} @ {event.time}</p>
                <p className="truncate text-gray-600 dark:text-gray-300">{event.text}</p>
                <div className="flex justify-end space-x-1 mt-0.5">
                   <button onClick={() => openModalForEdit(date, event)} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300"><Edit2 size={12} /></button>
                   <button onClick={() => handleDeleteEvent(dateKey, event.id)} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-300"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-6 w-6 text-gray-400 hover:text-green-500 dark:hover:text-green-400" onClick={() => openModalForDate(date)}>
            <PlusCircle size={16} />
          </Button>
        </div>
      );
    }
    return cells;
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Helmet>
        <title>Social Media Post Scheduler Planner | Toolzenix</title>
        <meta name="description" content="Visually plan your social media posts with our frontend-only calendar. Organize content for Instagram, Facebook, Twitter, and more. Data saved locally." />
        <link rel="canonical" href="https://toolzenix.com/post-scheduler-planner" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <CalendarDays className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Social Media Post Planner
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Visually plan your social media content. All data is saved locally in your browser.
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={handlePrevMonth} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              <ChevronLeft className="w-5 h-5 mr-1 sm:mr-2" /> Prev
            </Button>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="outline" onClick={handleNextMonth} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              Next <ChevronRight className="w-5 h-5 ml-1 sm:ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-px border-l border-t dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center py-2 font-medium text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-750 border-r border-b dark:border-gray-700">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">{editingEventId ? 'Edit Post' : 'Schedule New Post'} for {selectedDate?.toLocaleDateString()}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-text" className="text-right text-gray-700 dark:text-gray-300">
                  Content
                </Label>
                <Textarea id="event-text" value={eventText} onChange={(e) => setEventText(e.target.value)} placeholder="Your post content..." className="col-span-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-time" className="text-right text-gray-700 dark:text-gray-300">
                  Time
                </Label>
                <Input id="event-time" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="col-span-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-platform" className="text-right text-gray-700 dark:text-gray-300">
                  Platform
                </Label>
                <select id="event-platform" value={eventPlatform} onChange={(e) => setEventPlatform(e.target.value)} className="col-span-3 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Twitter</option>
                  <option>LinkedIn</option>
                  <option>Pinterest</option>
                  <option>TikTok</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveEvent} className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                <Save className="w-4 h-4 mr-2" /> {editingEventId ? 'Update' : 'Schedule'} Post
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
          <h2 className="text-2xl font-semibold">Plan Your Social Domination</h2>
          <p>
            This tool provides a simple, visual way to plan your social media posts. Click on a date to add a new post, or click an existing post to edit or delete it.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>All your planned posts are saved in your browser's local storage – nothing is sent to any server.</li>
            <li>This is a planning tool only; it does not automatically publish posts to social media platforms.</li>
            <li>Organize by content, time, and platform for a clear overview of your upcoming social media activity.</li>
          </ul>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertTriangle size={16} className="mr-2"/> Since data is stored locally, clearing your browser cache or using a different browser/device will result in loss of data.</p>
        </motion.div>
      </div>
    </>
  );
};

export default PostSchedulerPlanner;