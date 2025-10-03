<template>
  <section>
    <li @click="toggleTeamDetails" class="team-name">{{ name }}</li>
    <project-members
      v-if="teamDetailsVisible"
      :team-id="teamId"
    ></project-members>
  </section>
</template>

<script>
import ProjectMembers from './ProjectMembers.vue';
export default {
  name: 'ProjectItem',
  components: {
    ProjectMembers,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    teamDetailsVisible: {
      type: Boolean,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
  },
  inject: ['projects'],
  emits: ['toggle-team-details'],

  data() {
    return {
      selectedProjectId: null,
    };
  },

  methods: {
    toggleTeamDetails() {
      this.$emit('toggle-team-details', this.projectId);
      //this.$router.push(this.ProjectMembersLink);
    },
  },
};
</script>
<style scoped>
section {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 20%;
  min-width: 20rem;
}

.team-name {
  font-weight: bold;
  font-size: larger;
}
</style>
