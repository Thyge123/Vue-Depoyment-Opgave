<template>
  <h2>Project List</h2>
  <ul>
    <project-item
      v-for="project in projects"
      :key="project.id"
      :name="project.name"
      @toggle-team-details="selectTeam"
      :team-id="project.teamId"
      :team-details-visible="
        teamDetailsVisible && selectedTeamId === project.teamId
      "
      :selected-team-id="selectedTeamId"
      :selected-team-members="selectedTeamMembers"
      :selected-team-name="selectedTeamName"
    ></project-item>
  </ul>
</template>

<script>
import ProjectItem from './ProjectItem.vue';
export default {
  name: 'ProjectList',
  components: {
    ProjectItem,
  },
  inject: ['projects', 'teams', 'users'],
  props: {},
  data() {
    return {
      teamDetailsVisible: false,
      selectedTeamId: null,
      selectedTeamMembers: [],
      selectedTeamName: '',
    };
  },
  watch: {
    selectedTeamId(newId) {
      if (newId) {
        const team = this.teams.find((t) => t.id === newId);
        const members = team.members.map((memberId) =>
          this.users.find((u) => u.id === memberId)
        );
        this.selectedTeamMembers = members;
        this.selectedTeamName = team.name;
        this.teamDetailsVisible = true;
      } else {
        this.teamDetailsVisible = false;
      }
    },
  },
  methods: {
    routeToTeam(teamId) {
      this.$router.push(`/teams/${teamId}`);
    },
    selectTeam(teamId) {
      if (this.selectedTeamId === teamId) {
        // If clicking the same team, toggle by setting the ID to null
        this.selectedTeamId = null;
      } else {
        // If clicking a new team, set the new ID
        this.selectedTeamId = teamId;
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
li {
  list-style: none;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
