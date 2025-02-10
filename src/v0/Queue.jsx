"use client"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { X } from "lucide-react"

export default function Queue({ queue, playSong, removeFromQueue, moveInQueue }) {
  const onDragEnd = (result) => {
    if (!result.destination) return
    moveInQueue(result.source.index, result.destination.index)
  }

  return (
    <div className="bg-gray-800 w-64 flex-shrink-0 overflow-y-auto">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700 text-yellow-300">Queue</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="queue">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {queue.map((song, index) => (
                <Draggable key={index} draggableId={`song-${index}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                    >
                      <div onClick={() => playSong(song)}>
                        <h3 className="font-semibold text-white">{song.title}</h3>
                        <p className="text-gray-400">{song.artist}</p>
                      </div>
                      <button
                        onClick={() => removeFromQueue(index)}
                        className="text-gray-400 hover:text-yellow-300 transition-colors duration-200"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

