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
  "Platform",
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
    <div class="relative pt-6 pb-28 sm:pb-24">
      <div
        class="flex justify-start max-w-7xl mx-auto px-8 sm:px-6 mt-6 sm:mt-16"
      >
        <span data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
          <ThemeToggler />
        </span>
      </div>
      <div class="mx-auto max-w-7xl px-8 sm:px-6 mt-28 sm:mt-6">
        <div class="text-center">
          <h1
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="200"
            class="text-4xl px-2 h-12 md:h-fit tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl transition-color"
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
            class="mt-24 md:mt-6 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl md:max-w-3xl transition-color"
          >
            Written carefully and deployed with love, Monoxide API gives life to
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
          class="flex-1 w-full bg-violet-900 dark:bg-stone-800 transition-color"
        />
      </div>
      <div
        class="max-w-7xl mx-auto px-8 sm:px-6 pb-12"
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
  <div class="bg-violet-900 dark:bg-stone-800 transition-color">
    <div class="relative py-16 sm:py-24 mx-auto max-w-7xl px-8 text-start">
      <div class="text-start">
        <h1
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="200"
          class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 transition-color"
        >
          <span class="text-violet-700 dark:text-violet-400 transition-color">
            Monoxide
          </span>
          <span>❤️ Open Source</span>
        </h1>
        <p
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="400"
          class="mt-4 md:mt-6 text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl md:max-w-3xl transition-color"
        >
          Built by with the most modern, battle tested technologies. Monoxide
          aim to develop an accessible platform for everyone.
        </p>
        <p
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="500"
          class="mt-2 md:mt-6 text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl md:max-w-3xl transition-color"
        >
          For community, by community.
        </p>
        <div
          class="my-10 sm:my-14 w-full grid grid-cols-3 sm:grid-cols-9 gap-10 justify-center items-center text-gray-500 dark:text-gray-300 transition"
        >
          <NuxtLink
            to="https://nextjs.org"
            target="_blank"
            title="Next.js"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Next.js</title>
              <path
                d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://reactjs.org"
            target="_blank"
            title="React.js"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="1000"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>React.js</title>
              <path
                d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://v3.nuxtjs.org"
            target="_blank"
            title="Nuxt.js"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="1200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Nuxt.js</title>
              <path
                d="M9.078 3.965c-.588 0-1.177.289-1.514.867L.236 17.433c-.672 1.156.17 2.601 1.514 2.601h5.72a1.676 1.676 0 0 1-.35-2.117l5.547-9.513-2.076-3.572a1.734 1.734 0 0 0-1.513-.867zm7.407 2.922c-.487 0-.973.236-1.252.709L9.17 17.906c-.557.945.138 2.13 1.251 2.13h12.13c1.114 0 1.81-1.185 1.253-2.13l-6.067-10.31a1.437 1.437 0 0 0-1.252-.71z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://vuejs.org"
            target="_blank"
            title="Vue.js"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="1400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Vue.js</title>
              <path
                d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://tailwindcss.com"
            target="_blank"
            title="Tailwind CSS"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="1600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Tailwind CSS</title>
              <path
                d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://platformio.org"
            target="_blank"
            title="Platform IO"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="1800"
          >
            <svg
              viewBox="0 0 224 224"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Platform IO</title>
              <path
                d="M160.869 74.062l5.145-18.537c5.264-.47 9.392-4.886 9.392-10.273 0-5.7-4.62-10.32-10.32-10.32s-10.32 4.62-10.32 10.32c0 3.755 2.013 7.03 5.01 8.837l-5.05 18.195c-14.437-3.67-26.625-3.39-26.625-3.39l-2.258 1.01v140.872l2.258.753c13.614 0 73.177-41.133 73.323-85.27 0-31.624-21.023-45.825-40.555-52.197zM146.53 164.8c-11.617-18.557-6.706-61.751 23.643-67.925 8.32-1.333 18.509 4.134 21.51 16.279 7.582 25.766-37.015 61.845-45.153 51.646zm18.216-39.752a9.399 9.399 0 0 0-9.399 9.399 9.399 9.399 0 0 0 9.4 9.399 9.399 9.399 0 0 0 9.398-9.4 9.399 9.399 0 0 0-9.399-9.398zm2.81 8.672a2.374 2.374 0 1 1 0-4.749 2.374 2.374 0 0 1 0 4.749z"
              />
              <path
                d="M101.371 72.709l-5.023-18.901c2.874-1.832 4.786-5.04 4.786-8.701 0-5.7-4.62-10.32-10.32-10.32-5.699 0-10.319 4.62-10.319 10.32 0 5.682 4.592 10.289 10.267 10.317L95.8 74.378c-19.609 6.51-40.885 20.742-40.885 51.88.436 45.01 59.572 85.267 73.186 85.267V68.892s-12.252-.062-26.729 3.817zm10.395 92.09c-8.138 10.2-52.735-25.88-45.154-51.645 3.002-12.145 13.19-17.612 21.511-16.28 30.35 6.175 35.26 49.369 23.643 67.926zm-18.82-39.46a9.399 9.399 0 0 0-9.399 9.398 9.399 9.399 0 0 0 9.4 9.4 9.399 9.399 0 0 0 9.398-9.4 9.399 9.399 0 0 0-9.399-9.399zm-2.81 8.671a2.374 2.374 0 1 1 0-4.748 2.374 2.374 0 0 1 0 4.748z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://netlify.com"
            target="_blank"
            title="Netlify"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="2000"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Netlify</title>
              <path
                d="M17.3877 8.3286l-.0088-.0037c-.005-.002-.01-.0038-.0144-.0082a.0689.0689 0 0 1-.0176-.0582l.4839-2.9581 2.269 2.2696L17.74 8.574a.052.052 0 0 1-.0206.0037H17.71a.0647.0647 0 0 1-.0126-.0106 1.074 1.074 0 0 0-.3097-.2385zm3.291-.1802l2.4262 2.426c.5039.5045.7561.7562.8481 1.0479.0138.0431.025.0863.0338.1308l-5.798-2.4555a.4557.4557 0 0 0-.0093-.0038c-.0232-.0094-.0501-.02-.0501-.0439 0-.0237.0275-.035.0507-.0444l.0075-.0031zm3.2092 4.3833c-.1252.2354-.3693.4795-.7824.8932l-2.7353 2.7347-3.5377-.7367-.0188-.0038c-.0313-.005-.0645-.0107-.0645-.0388a1.0678 1.0678 0 0 0-.41-.7467c-.0144-.0144-.0106-.037-.0063-.0576 0-.003 0-.0063.0013-.0088l.6654-4.0848.0025-.0138c.0038-.0313.0094-.0676.0376-.0676a1.0829 1.0829 0 0 0 .726-.4162c.0056-.0063.0094-.0131.017-.0169.02-.0094.0437 0 .0644.0088l6.0402 2.555zm-4.1467 4.257l-4.498 4.4979.77-4.732.0012-.0063a.083.083 0 0 1 .0038-.0182c.0063-.015.0226-.0213.0382-.0275l.0075-.0031a1.158 1.158 0 0 0 .435-.3236c.015-.0176.0332-.0345.0564-.0376a.0563.0563 0 0 1 .0181 0l3.1672.651zm-5.45 5.4499l-.507.507-5.6052-8.1007a.2654.2654 0 0 0-.0062-.0088c-.0088-.012-.0182-.0238-.0163-.0376.0006-.01.0069-.0188.0138-.0263l.0062-.0081c.017-.025.0313-.05.047-.077l.0125-.0219.0019-.0019c.0087-.015.0169-.0294.0319-.0376.0131-.0063.0313-.0038.0457-.0006l6.2098 1.2807a.1027.1027 0 0 1 .0476.0206c.008.0081.01.017.0119.027a1.0998 1.0998 0 0 0 .6434.7354c.0175.0088.01.0282.002.0488a.149.149 0 0 0-.0095.0282c-.0782.4757-.7492 4.568-.9295 5.6728zm-1.059 1.0584c-.3737.37-.594.5659-.8432.6447a1.2519 1.2519 0 0 1-.7549 0c-.2916-.0926-.5439-.3442-1.0478-.8487l-5.629-5.629 1.4704-2.2802a.0938.0938 0 0 1 .025-.0294c.0157-.0113.0382-.0063.057 0a1.5235 1.5235 0 0 0 1.0253-.052c.0169-.0063.0338-.0106.0469.0013a.119.119 0 0 1 .0175.02l5.6327 8.174zm-8.8175-6.3756L3.1234 15.63l2.55-1.0879a.0526.0526 0 0 1 .0207-.0044c.0213 0 .0338.0213.045.0407a1.8214 1.8214 0 0 0 .0814.1152l.0082.01c.0075.0106.0025.0213-.005.0313l-1.4084 2.1864zm-1.8628-1.8628L.9183 13.4249c-.278-.2779-.4795-.4794-.6197-.6528l4.9674 1.0303a.5258.5258 0 0 0 .0187.003c.0307.005.0645.0107.0645.0395 0 .0313-.037.0457-.0682.0576l-.0144.0063zM.0132 11.932a1.2519 1.2519 0 0 1 .0563-.3098c.0927-.2917.3443-.5434.8488-1.0478l2.0906-2.0906a1361.7196 1361.7196 0 0 0 2.8955 4.1855c.017.0226.0357.0476.0163.0664-.0914.1008-.1828.211-.2473.3305a.1001.1001 0 0 1-.0313.0388c-.008.005-.0169.003-.0262.0013h-.0013l-5.6014-1.175zm3.5553-4.0078l2.811-2.811c.2641.1157 1.2256.522 2.0856.885.651.2754 1.2443.5258 1.4308.6071.0188.0076.0357.015.0439.0338.005.0113.0025.0257 0 .0376a1.2537 1.2537 0 0 0 .3273 1.1442c.0188.0188 0 .0457-.0163.0689l-.0088.0131-2.8542 4.421c-.0075.0124-.0144.023-.0269.0312-.015.0094-.0363.005-.0538.0006a1.4234 1.4234 0 0 0-.34-.0463c-.1026 0-.214.0188-.3266.0395h-.0007c-.0125.0019-.0238.0044-.0338-.0031a.1314.1314 0 0 1-.0281-.032zm3.3787-3.3788l3.6391-3.639c.504-.5039.7562-.7561 1.0478-.8481a1.2519 1.2519 0 0 1 .755 0c.2916.092.5438.3442 1.0477.848l.7887.7888-2.5882 4.0084a.097.097 0 0 1-.0257.03c-.0156.0107-.0375.0063-.0563 0a1.3126 1.3126 0 0 0-1.2018.2316c-.0169.0176-.042.0075-.0632-.0019-.338-.147-2.967-1.258-3.343-1.4177zm7.8278-2.3009l2.3898 2.3898-.5758 3.5665v.0094a.0845.0845 0 0 1-.005.0238c-.0063.0125-.0188.015-.0313.0188a1.1454 1.1454 0 0 0-.343.1709.0964.0964 0 0 0-.0125.0106c-.007.0075-.0138.0144-.025.0157a.0714.0714 0 0 1-.027-.0044l-3.6416-1.5473-.007-.0031c-.0231-.0094-.0506-.0207-.0506-.0445a1.3758 1.3758 0 0 0-.194-.5727c-.0176-.0288-.037-.0588-.022-.0883zm-2.461 5.3868l3.4138 1.446c.0188.0087.0394.0168.0476.0362a.0663.0663 0 0 1 0 .0357.848.848 0 0 0-.0188.1646v.0958c0 .0238-.0244.0338-.047.0432l-.0069.0025c-.5408.231-7.5924 3.238-7.603 3.238-.0107 0-.022 0-.0326-.0107-.0188-.0188 0-.0451.0169-.0689a.4757.4757 0 0 0 .0087-.0125l2.8054-4.344.005-.0074c.0163-.0263.035-.0557.0651-.0557l.0282.0043c.0638.0088.1202.017.1771.017.4257 0 .82-.2072 1.0579-.5615a.1001.1001 0 0 1 .0212-.025c.017-.0126.042-.0063.0614.0024zm-3.9095 5.7492l7.6863-3.278s.0113 0 .022.0106c.0419.042.0776.0701.112.0964l.0169.0107c.0156.0088.0313.0188.0325.035 0 .0063 0 .01-.0013.0157l-.6584 4.0447-.0025.0163c-.0044.0313-.0088.067-.0382.067a1.0822 1.0822 0 0 0-.8594.5301l-.0031.005c-.0088.0144-.017.0282-.0313.0357-.0131.0063-.03.0038-.0438.0006L8.5064 13.706c-.0063-.0013-.0952-.3249-.102-.3255z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://prisma.io"
            target="_blank"
            title="Prisma"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="2200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Prisma</title>
              <path
                d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://planetscale.com"
            target="_blank"
            title="PlanetScale"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="2400"
          >
            <svg
              viewBox="0 0 44 44"
              fill="currentColor"
              class="h-20 w-20 hover:scale-110 active:scale-95 hover:text-violet-300 transition"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>PlanetScale</title>
              <path
                d="M0 22C1.03435e-06 9.84973 9.84974 -1.03435e-06 22 0C30.9336 7.80998e-07 38.6235 5.3248 42.069 12.9737L12.9737 42.069C11.7252 41.5066 10.5385 40.8311 9.42689 40.0555L27.4824 22H22L6.44366 37.5563C2.46244 33.5751 -5.31105e-07 28.0751 0 22Z"
              ></path>
              <path
                d="M44 22.0076L22.0076 44C34.1518 43.9959 43.9959 34.1518 44 22.0076Z"
              ></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="relative py-2 md:py-20">
      <div
        class="hidden absolute top-0 inset-x-0 h-1/2 bg-transparent lg:block"
        aria-hidden="true"
      />
      <div
        class="max-w-7xl mx-auto bg-violet-900 dark:bg-stone-800 lg:bg-transparent lg:px-5"
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
            class="relative -mt-24 md:-mt-10 pt-24 md:pt-0 bg-violet-200 shadow-2xl dark:bg-stone-900 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-xl lg:grid lg:grid-cols-10 lg:items-center"
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
                Monoxide is a Cloud-based IoT integrated system for lethal gas
                substance prevention. This project was initially developed for
                an IoT competition.
              </p>
              <button
                class="block w-full py-2 px-6 text-center bg-violet-600 font-extrabold text-md rounded-lg shadow text-gray-100 active:bg-violet-800 sm:inline-block sm:w-auto hover:scale-105 active:scale-95 transition disabled:cursor-not-allowed disabled:bg-violet-800"
                title="Documentation is in progress..."
                disabled
              >
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
