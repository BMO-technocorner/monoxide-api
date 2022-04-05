<template>
  <footer class="bg-violet-900 dark:bg-stone-800 transition-color">
    <div
      class="flex flex-wrap flex-col lg:flex-row py-6 max-w-7xl mx-auto px-6"
    >
      <p class="text-gray-100 text-md text-center lg:text-left">
        © 2022 —
        <NuxtLink
          to="https://github.com/BMO-technocorner"
          title="Organization's profile"
          target="_blank"
          class="font-semibold hover:underline active:text-violet-300 transition"
        >
          @BMO
        </NuxtLink>
      </p>
      <span
        class="text-gray-100 inline-flex lg:ml-auto mt-4 lg:mt-0 justify-center lg:justify-start"
      >
        <a
          title="Organization's GitHub"
          href="https://github.com/BMO-technocorner"
          rel="noopener noreferrer"
          target="_blank"
          class="active:scale-100 hover:scale-105 active:text-violet-300 flex transition"
        >
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
          >
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          GitHub
        </a>
      </span>
    </div>
  </footer>
</template>
