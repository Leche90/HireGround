<template>
  <div class="landing-page">
    <h1>HireGround</h1>

    <p class="subtitle">
      Track and manage your job applications effortlessly.
    </p>

    <div class="button-group">
      <RouterLink to="/login" class="btn btn-primary">
        Log In
      </RouterLink>
      <RouterLink to="/signup" class="btn btn-outline">
        Sign Up
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style scoped lang="scss">
.landing-page {
  height: 100vh;
  width: 100vw;
  background-color: #1a202c; // equivalent to Tailwind's bg-gray-900
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 6rem;
    font-weight: 800;
    margin-bottom: 0;

    @media (max-width: 640px) {
      font-size: 4rem;
    }

    @media (min-width: 1024px) {
      font-size: 6rem;
    }
  }

  .subtitle {
    font-size: 1.25rem;
    color: #cbd5e0; // light gray
    max-width: 40rem;
    margin-top: -25px;
    margin-bottom: 5rem;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 640px) {
      flex-direction: row;
    }

    .btn {
      padding: 1rem 2rem;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: background-color 0.3s, color 0.3s;

      &.btn-primary {
        background-color: #ed8936; // orange-500
        color: white;
        border: none;

        &:hover {
          background-color: #dd6b20; // orange-600
        }
      }

      &.btn-outline {
        background-color: transparent;
        border: 2px solid #ed8936;
        color: #ed8936;

        &:hover {
          background-color: #ed8936;
          color: white;
        }
      }
    }
  }
}
</style>
