<script setup lang="ts">
console.log('')
</script>

<template>
    <div class="bg-gray-100">
        <div class="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
              <div class="flex items-center space-x-2 text-gray-400">
                <span class="text-green-700 tracking-wider font-thin text-md"><a href="#">Home</a></span>
                <span>/</span>
                <span class="tracking-wide text-md">
                    <span class="text-base">Tasks</span>
                </span>
                <span>/</span>
              </div>
              <button
    class="inline-flex items-center gap-2 rounded border border-[#FF0029] px-6 py-2 text-sm font-semibold text-[#FF0029] transition-all hover:bg-[#FF0029] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
    Logout
  </button>
        </div>
        <div class="header my-3 h-12 px-10 flex items-center justify-between">
            <h1 class="font-medium text-2xl">All Tasks</h1>
        </div>
        <div class="flex flex-col mx-3 mt-6 lg:flex-row">
            <div class="w-full lg:w-1/3 m-1">
                <form class="w-full bg-white shadow-md p-6">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-full px-3 mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">Task Name</label>
                            <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="name" placeholder="Task Name" required />
                        </div>
                        <div class="w-full px-3 mb-6">
                            <textarea textarea rows="4" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="description" required > </textarea>
                        </div>                        
                        
                        <div class="w-full md:w-full px-3 mb-6">
                            <button class="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                            >Add Task</button>
                        </div>
                      
                        
                    </div>
                </form>
            </div>
            <div class="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
                <div class="overflow-x-auto rounded-lg p-3">
                    <div class="space-x-3">
                        <button
    class="inline-flex items-center gap-2 rounded-full border border-[#14843c] px-6 py-2 text-sm font-semibold text-[#14843c] transition-all hover:bg-[#14843c] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
    All
  </button>
  <button
    class="inline-flex items-center gap-2 rounded-full border border-[#14843c] px-6 py-2 text-sm font-semibold text-[#14843c] transition-all hover:bg-[#14843c] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
    Completed
  </button>
  <button
    class="inline-flex items-center gap-2 rounded-full border border-[#14843c] px-6 py-2 text-sm font-semibold text-[#14843c] transition-all hover:bg-[#14843c] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
    Incompleted
  </button>
                    </div>
                    <table class="table-auto w-full">
                        <thead class="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                            <tr>
                                <th></th><th class="p-2">
                                    <div class="font-semibold">Task</div>
                                </th>
                                <th class="p-2">
                                    <div class="font-semibold text-left">Description</div>
                                </th>
                                <th class="p-2">
                                    <div class="font-semibold text-center">Action</div>
                                </th>
                            </tr>
                            <tr>
                                <td>1</td>
                                
                                <td class="text-center">Tarea 1</td>
                                <td>Probando la seccion de tareas</td>
                                <td class="p-2">
                                    <div class="flex justify-center">
                                    <a href="#" class="rounded-md hover:bg-blue-100 text-blue-600 p-2 flex justify-between items-center">
                                        <span><FaEdit class="w-4 h-4 mr-1"/>
                                        </span> Edit
                                    </a>
                                    <button class="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center">
                                        <span><FaTrash class="w-4 h-4 mr-1" /></span> Completed
                                    </button>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

