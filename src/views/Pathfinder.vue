<template>
  <div class="pathfinder">
    <h1>Pathfinder</h1>
    <PathfindingVisualizer></PathfindingVisualizer>
  </div>
</template>

<script>
import PathfindingVisualizer from '@/components/Pathfinder/PathfindingVisualizer';

export default {
  name: 'pathfinder',
  components: {
    PathfindingVisualizer
  },
    data: () => ({
  }),
}
</script>