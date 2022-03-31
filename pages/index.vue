<script setup lang="ts">
// @ts-ignore
import Typewriter from "vue-writer";
import AOS from "aos";

definePageMeta({
  layout: "base",
});

onMounted(() => {
  AOS.init({ disable: "mobile" });
});

const monoxideAcronyms = [
  "Ecosystem",
  "Architecture",
  "Project",
  "Masterpiece",
  "System",
].map((word) => ` ${word}`);
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="absolute inset-y-0 h-full w-full" aria-hidden="true">
      <div class="relative h-full dark:opacity-20 transition-opacity">
        <svg
          class="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-300"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
          />
        </svg>
        <svg
          class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="d2a68204-c383-44b1-b99f-42ccff4e5365"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-300"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
          />
        </svg>
      </div>
    </div>
    <div class="relative pt-6 pb-16 sm:pb-24">
      <div
        class="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-16"
      >
        <span data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
          <ThemeToggler />
        </span>
      </div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 mt-10 sm:mt-6">
        <div class="text-center">
          <h1
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="200"
            class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl transition-color"
          >
            <span class="block">The 🧠 behind</span>
            <span
              class="block text-violet-700 dark:text-violet-400 transition-color"
            >
              <Typewriter
                :array="monoxideAcronyms"
                :start="1500"
                :delay="6000"
                caret="cursor"
                >Monoxide</Typewriter
              >
            </span>
          </h1>
          <p
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="400"
            class="mt-4 md:mt-6 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl md:max-w-3xl transition-color"
          >
            Written carefully and deployed with ❤️, Monoxide API gives life to
            the Monoxide IoT Integrated Platform.
          </p>
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="800"
            class="mt-8 md:text-xl w-full flex align-center"
          >
            <NuxtLink
              to="https://insomnia.rest/run/?label=Monoxide&uri=https%3A%2F%2Fapi-monoxide.ezralazuardy.com%2Fv1%2FMonoxide.json"
              target="_blank"
              class="mx-auto"
            >
              <img
                class="rounded-lg h-10 shadow-lg hover:scale-105 active:scale-95 active:opacity-80 transition"
                src="~/assets/images/insomnia.svg"
                alt="Run in Insomnia"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex flex-col" aria-hidden="true">
        <div class="flex-1" />
        <div
          class="flex-1 w-full bg-violet-900 dark:bg-stone-700 transition-color"
        />
      </div>
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 pb-12"
        data-aos="fade-up"
        data-aos-ease="ease"
        data-aos-duration="1000"
        data-aos-delay="800"
      >
        <img
          class="relative rounded-lg shadow-xl hover:scale-105 transition"
          src="~/assets/images/monoxide-insomnia.png"
          alt="Monoxide API in Insomnia"
        />
      </div>
    </div>
  </div>
  <div class="bg-violet-900 dark:bg-stone-700 transition-color">
    <div class="relative py-16">
      <div
        class="hidden absolute top-0 inset-x-0 h-1/2 bg-transparent lg:block"
        aria-hidden="true"
      />
      <div
        class="max-w-7xl mx-auto bg-violet-900 dark:bg-stone-700 lg:bg-transparent lg:px-5"
      >
        <div class="lg:grid lg:grid-cols-12">
          <div
            class="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent"
          >
            <div
              class="max-w-md mx-auto px-8 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0"
            >
              <div class="aspect-square">
                <img
                  data-aos="fade-right"
                  data-aos-ease="ease"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  class="aspect-square object-cover object-center rounded-xl shadow-2xl"
                  src="~/assets/images/monoxide-light.png"
                  alt="Monoxide Logo"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-ease="ease"
            data-aos-duration="1000"
            data-aos-delay="200"
            class="relative -mt-24 md:-mt-0 pt-24 md:pt-0 bg-violet-200 shadow-2xl dark:bg-stone-800 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-xl lg:grid lg:grid-cols-10 lg:items-center"
          >
            <div
              class="relative max-w-md mx-auto py-12 px-8 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6"
            >
              <h2
                class="text-3xl font-extrabold text-gray-900 dark:text-gray-100 transition-color"
                id="join-heading"
              >
                About Monoxide
              </h2>
              <p
                class="text-lg text-gray-900 dark:text-gray-100 transition-color"
              >
                Monoxide is a Cloud-based IoT integrated system project for
                lethal gas substance prevention. This project was initially
                developed for an IoT competition.
              </p>
              <a
                class="block w-full py-2 px-6 text-center bg-violet-600 border-violet-700 font-extrabold text-md rounded-lg shadow text-gray-100 active:bg-violet-800 sm:inline-block sm:w-auto hover:scale-105 active:scale-95 transition disabled:cursor-not-allowed"
                href="#"
                title="Documentation is in progress..."
                disabled
              >
                Show Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
