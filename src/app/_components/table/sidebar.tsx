import { Icons } from "../common/Icons";

export default function Sidebar() {
  return (
    <div className="flex h-full w-80 flex-col justify-between border-t border-gray-200 px-4 pb-6 pt-2 text-sm">
      {/* Upper */}
      <div className="flex min-h-[144px] flex-col">
        <div className="flex flex-row items-center gap-2 px-3 py-2 text-gray-500">
          <Icons.Search />
          <h1>Find a view</h1>
        </div>
        <div className="mb-2 h-px w-full self-center bg-gray-200" />
        <div className="flex flex-row items-center justify-between rounded-sm bg-sky-100 px-2 py-2">
          <div className="flex items-center gap-2">
            <Icons.Table className="text-blue-600" />
            <h1>Grid view</h1>
          </div>
          <Icons.Check />
        </div>
      </div>

      {/* Lower */}
      <section className="flex flex-col gap-5 px-2">
        <div className="h-px w-full self-center bg-gray-200" />

        <div className="flex items-center justify-between">
          <h1 className="text-md font-medium">Create...</h1>
          <Icons.Down />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Table className="text-blue-600" />
              <h1>Grid</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Calendar className="text-red-500" />
              <h1>Calender</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Gallery className="text-purple-600" />
              <h1>Gallery</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Kanban className="text-green-600" />
              <h1>Kanban</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Timeline className="text-red-500" />
              <h1>Timeline</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Group className="text-blue-600" />
              <h1>List</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icons.Gantt className="text-teal-700" />
              <h1>Gantt</h1>
            </div>
            <Icons.Add />
          </div>
          <div className="flex items-center justify-between">
            <h1>New section</h1>
            <Icons.Add />
          </div>
        </div>

        <div className="h-px w-full self-center bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Icons.Form className="text-pink-400" />
            <h1>Form</h1>
          </div>
          <Icons.Add />
        </div>
      </section>
    </div>
  );
}
