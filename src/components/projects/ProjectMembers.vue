<template>
  <div class="team-details">
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
</template>

<script>
export default {
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  inject: ['teams', 'users'],
  data() {
    return {};
  },
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
  },
};
</script>

<style scoped>
li {
  list-style: none;
  padding: 8px 12px;
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
