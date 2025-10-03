<template>
  <section>
    <li @click="toggleTeamDetails" class="team-name">{{ name }}</li>
    <div v-if="teamDetailsVisible" class="team-details">
      <h3>Team Details for {{ team.name }}</h3>
      <ul>
        <li
          v-for="member in teamMembers"
          :key="member.id"
          class="team-details-member"
        >
          {{ member.fullName }} - {{ member.role }}
        </li>
      </ul>
      <button @click="routeToTeam(teamId)">Go to Team Page</button>
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
    projectId: {
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
  },
  inject: ['teams', 'users'],
  emits: ['toggle-team-details'],
  computed: {
    team() {
      return this.teams.find((t) => t.id === this.teamId);
    },
    teamMembers() {
      if (!this.team) return [];
      return this.team.members.map((memberId) =>
        this.users.find((u) => u.id === memberId)
      );
    },
  },
  methods: {
    routeToTeam(teamId) {
      this.$router.push(`/teams/${teamId}`);
    },
    toggleTeamDetails() {
      this.$emit('toggle-team-details', this.projectId);
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
  padding: 8px 12px;
}

.team-name {
  font-weight: bold;
  font-size: larger;
}

ul {
  padding: 0;
}

h3 {
  margin: 0;
}

.team-details,
.team-details-member {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

section {
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
  width: 100%;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  background-color: #11005c;
  color: white;
  cursor: pointer;
}
</style>
