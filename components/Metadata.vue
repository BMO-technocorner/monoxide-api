<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <Html lang="en-US">
    <Head>
      <Title>{{ config.APP_NAME }}</Title>
      <Meta name="apple-mobile-web-app-title" content="{{ config.APP_NAME }}" />
      <Meta name="application-name" content="{{ config.APP_NAME }}" />
      <Meta name="description" content="{{ config.APP_DESCRIPTION }}" />
      <Meta name="msapplication-config" content="/browserconfig.xml" />
      <Meta name="theme-color" content="#1a1b1e" />
      <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <Link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Head>
    <Body
      class="overflow-x-hidden scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-gray-500 min-h-screen"
    >
      <slot />
    </Body>
  </Html>
</template>
