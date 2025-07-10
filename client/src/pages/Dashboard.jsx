import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Search, Home, Book, DollarSign, TrendingUp,
  BarChart3, CheckSquare, HelpCircle,
  Settings, Plus, X, Mail, Phone,
  User, FileText, Clock
} from 'lucide-react';

const leadColumns = [
  { id: 'new-leads',         title: 'New leads',           colorDot: 'bg-blue-500'   },
  { id: 'contacted',         title: 'Contacted',           colorDot: 'bg-purple-500' },
  { id: 'meeting-in-person', title: 'Meeting (in-person)', colorDot: 'bg-blue-500'   },
  { id: 'meeting-online',    title: 'Meeting (online)',    colorDot: 'bg-orange-500' },
  { id: 'won',               title: 'Won',                 colorDot: 'bg-green-500'  },
];


const sampleLead = {
  id:         'lead-1',
  name:       'Simrandeep Kaur',
  email:      'skaur@gmail.com',
  phone:      '604-562-8935',
  assignedTo: 'Emma Hubert',
  notes:      2,
  lastActive: '1d',
};

const LeadCard = React.memo(React.forwardRef(({ lead, isPlaceholder, isDragging, style, ...props }, ref) => {
  if (isPlaceholder) {
    return (
      <div
        className="
          border-2 border-dashed border-blue-300
          rounded-lg p-4 text-blue-600 bg-blue-50
          flex items-center justify-center text-sm font-medium
          min-h-[120px]
        "
      >
        Drop here
      </div>
    );
  }

  const initials = lead.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      ref={ref}
      style={style}
      className={`
        bg-white rounded-lg border border-gray-200
        px-4 py-3 shadow-sm transition-shadow
        ${isDragging ? 'opacity-75 shadow-lg' : 'hover:shadow-md'}
      `}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-900 underline">{lead.name}</span>
      </div>

      {/* Contact info */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{lead.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{lead.phone}</span>
        </div>
      </div>

      {/* Assigned to */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-3 h-3 text-gray-600" />
        </div>
        <span className="text-sm text-gray-600">{lead.assignedTo}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>{lead.notes} Notes</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{lead.lastActive}</span>
        </div>
      </div>
    </div>
  );
}));

export default function Dashboard() {
  // Build initial data: first column gets 2, next 3 each get one, last is empty
  const [data, setData] = useState(() => {
    const obj = {};
    leadColumns.forEach((col, i) => {
      if (i === 0) obj[col.id] = [sampleLead, { ...sampleLead, id: 'lead-2' }];
      else if (i <= 3) obj[col.id] = [{ ...sampleLead, id: `lead-${i+2}`}];
      else obj[col.id] = [];
    });
    return obj;
  });

  const [showNotification, setShowNotification] = useState(true);

  // When drag ends, mutate the columns in state
  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    
    if (!destination) return;
    
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setData(prevData => {
      const newData = { ...prevData };
      const sourceItems = [...newData[source.droppableId]];
      const destItems = source.droppableId === destination.droppableId 
        ? sourceItems 
        : [...newData[destination.droppableId]];

      // Remove from source
      const [removed] = sourceItems.splice(source.index, 1);
      
      // Add to destination
      destItems.splice(destination.index, 0, removed);

      return {
        ...newData,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      };
    });
  }, []);

  // Sidebar items
  const sidebarItems = [
    { icon: Home,  label: 'Home'        , active: false },
    { icon: Book,  label: 'Your books'  , active: false },
    { icon: DollarSign, label: 'Sales'  , active: true  },
    { icon: TrendingUp, label: 'Expenses', active: false, badge: '8' },
    { icon: BarChart3,  label: 'Reporting', active: false },
    { icon: CheckSquare, label: 'Tasks'  , active: false },
    { icon: HelpCircle,  label: 'Support', active: false },
    { icon: Settings,   label: 'Settings', active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-100 transform scale-90 origin-top-left w-[111.11%] h-[111.11%]">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-500 rounded" />
            <span className="font-semibold text-gray-900">Untitled UI</span>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">⌘K</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map(({ icon: Icon, label, active, badge }, idx) => (
            <div
              key={idx}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium
                ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
          ))}
        </nav>

        {showNotification && (
          <div className="m-4 p-3 bg-gray-100 rounded-lg relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-medium text-sm mb-1">New features available!</h4>
            <p className="text-xs text-gray-600 mb-2">
              Check out the new dashboard view. Pages now load faster.
            </p>
            <div className="w-10 h-10 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-xs text-gray-500">IMG</span>
            </div>
            <div className="flex space-x-2">
              <button className="text-xs text-gray-500 hover:text-gray-700">
                Dismiss
              </button>
              <button className="text-xs text-blue-600 hover:text-blue-800">
                What's new?
              </button>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">OR</span>
            </div>
            <div>
              <div className="font-medium text-sm text-gray-900">Olivia Rhye</div>
              <div className="text-xs text-gray-500">olivia@untitledui.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 p-8 bg-gray-100">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-5 gap-6">
            {leadColumns.map(col => (
              <Droppable key={col.id} droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${col.colorDot}`} />
                        <span className="text-sm font-medium text-gray-900">{col.title}</span>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Plus className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Cards */}
                    <div className="space-y-3" style={{ minHeight: '400px' }}>
                      {data[col.id].length === 0 ? (
                        <LeadCard isPlaceholder />
                      ) : (
                        data[col.id].map((lead, idx) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={idx}>
                            {(prov, snap) => (
                              <LeadCard 
                                lead={lead} 
                                isDragging={snap.isDragging}
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                                style={prov.draggableProps.style}
                              />
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}