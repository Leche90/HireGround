<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 hover:ring-2 hover:ring-indigo-500 transition">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ job.title }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ job.company }}</p>
      </div>
      <span
        :class="statusClass(job.status)"
        class="text-xs font-medium px-2 py-1 rounded"
      >
        {{ job.status }}
      </span>
    </div>
    <div v-if="job.notes" class="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
      {{ job.notes }}
    </div>
    <div class="mt-4 flex justify-end space-x-2">
      <RouterLink
        :to="`/job/${job.id}`"
        class="text-indigo-600 hover:underline text-sm"
      >
        View / Edit
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
})

const statusClass = (status) => {
  const base = 'text-white'
  switch (status) {
    case 'Applied':
      return base + ' bg-blue-500'
    case 'Interviewing':
      return base + ' bg-yellow-500'
    case 'Rejected':
      return base + ' bg-red-500'
    case 'Offer':
      return base + ' bg-green-500'
    default:
      return base + ' bg-gray-400'
  }
}
</script>

<div class="line-clamp-2">
  {{ job.notes }}
</div>
