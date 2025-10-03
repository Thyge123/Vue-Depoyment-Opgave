<template>
  <section>
    <li @click="toggleTeamDetails">{{ name }}</li>
    <div v-if="teamDetailsVisible" class="team-details">
      <h3>Team Details for {{ selectedTeamName }}</h3>
      <ul>
        <li v-for="member in selectedTeamMembers" :key="member.id">
          {{ member.fullName }} - {{ member.role }}
        </li>
      </ul>
      <button @click="routeToTeam(selectedTeamId)">Go to Team Page</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    teamDetailsVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
    selectedTeamId: {
      type: String,
      required: false,
    },
    selectedTeamMembers: {
      type: Array,
      required: false,
    },
    selectedTeamName: {
      type: String,
      required: false,
    },
  },
  emits: ['toggle-team-details'],
  methods: {
    routeToTeam(teamId) {
      this.$router.push(`/teams/${teamId}`);
    },
    toggleTeamDetails() {
      this.$emit('toggle-team-details', this.teamId);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  padding: 8px 12px;
}

.team-details {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #11005c;
  color: white;
  cursor: pointer;
}
</style>
