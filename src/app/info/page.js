'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function Info() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 relative">
      {/* Back to Town Link */}
      <Link href="/" className="absolute top-6 left-6 text-white text-sm sm:text-base z-10">
        ← Back to Town
      </Link>

      {/* Thumbnail Image */}
      <div className="w-full pt-12">
        <Image
          src="images/thumbnail.jpg"
          alt="Page Thumbnail"
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Main Text */}
      <div className="text-lg leading-relaxed">
        <p>
        <b><i>stomping ground</i></b> is an interactive web experience that gives you a unique perspective of spaces that
shape and are shaped by the people who inhibit them. Told through the lens of the students themselves, this
project captures the emotional nature of cohabitation and connection. Each participant explores the way they
have made their space a home, and how being surrounded by your peers affects that. Through video, 360
imaging and overlays, they reflect on the memories and connections that are facilitated by their spaces. Whether
that be how furniture is rearranged to make room for more decorations, how walls are covered with reminders
of family and friends, or how inside jokes become physical reminders. Rather than offering a singular
narrative, <b><i>stomping ground</i></b> embraces multiplicity and personal experience. It prompts viewers to consider how
environments are co-created and how, in the process, they become more than just places to live.
        </p>
      </div>

      {/* Meet the Author Heading */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Meet the Creator</h2>

        {/* Author Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6">

        <Link href="https://marvinromero.online" target="_blank" rel="noopener noreferrer">
  <Image
    src="/images/portrait.jpeg"
    alt="Author Portrait"
    width={320}
    height={320}
    className="rounded-full object-cover transition-transform duration-300 hover:scale-110"
  />
</Link>
          <div>
            <h3 className="text-2xl font-semibold">Marvin Romero</h3>
            <p className="text-md mt-1 text-gray-600">
              Marvin is a creative technologist and storyteller who blends computer science with media design to build interactive projects across film, games, and the web. See more of his work at: <Link href="https://marvinromero.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">marvinromero.online</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
