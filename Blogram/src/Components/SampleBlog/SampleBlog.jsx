import React from "react";
import "./SampleBlog.css";
import BlogCard from "../BlogCard";
import { blogData } from "../../Data/BlogData";
import { Link } from "react-router-dom";

const SampleBlog = () => {
  return (
    <>
      <div id="explore-blog" className="container-fluid mt-4">
        <div className="row">
          {/*  Left container  */}
          <div className="col-md-8 mt-4">
            <div className="card">
              <div className="card-header">
                <h2>From the Firehouse</h2>
                <hr />
                <h1>The Mysteries of the Universe: Unveiling the Cosmos</h1>
                <em>
                  "The Universe is not only stranger than we imagine, it is
                  stranger than we can imagine." — J.B.S. Haldane
                </em>
                <br />
                <p>
                  From the majestic twinkling of stars to the awe-inspiring
                  spiral arms of distant galaxies, the universe has captivated
                  the human imagination for millennia. Yet, despite centuries of
                  exploration and scientific discovery, there remain profound
                  mysteries in the cosmos that continue to perplex even the
                  brightest minds. In this post, we’ll explore some of these
                  enigmatic phenomena, backed by recent scientific insights.
                </p>
                <em>
                  September 24, 2024 by <a href="#">Stan lee</a>
                </em>
              </div>
              <div className="card-body blog-post-body">
                <h4 className="mt-4">
                  Black Holes: The Beacons of the Universe
                </h4>
                <img
                  src="/bg4.webp"
                  className="img-fluid mb-3"
                  alt="Blog Image"
                />
                <p>
                  One of the greatest mysteries of the universe is the existence
                  of dark matter. Comprising roughly 85% of the total mass of
                  the universe, dark matter is invisible. We cannot see it,
                  touch it, or directly detect it using conventional scientific
                  instruments. Yet, we know it’s there—its gravitational
                  influence on galaxies and cosmic structures is undeniable.
                </p>
                <p>
                  Dark matter plays a pivotal role in the formation of galaxies.
                  Without it, the galaxies would not have enough mass to stay
                  bound together. However, despite decades of research,
                  scientists still don’t know what dark matter is composed of.
                  Leading theories suggest it could be made of weakly
                  interacting massive particles (WIMPs) or other exotic
                  particles beyond the standard model of physics. But so far,
                  the search for direct evidence remains elusive.
                </p>
                <h4 className="mt-4">Dark Energy: The Accelerating Universe</h4>
                <img
                  src="/bg4.webp"
                  className="img-fluid mb-3"
                  alt="Blog Image"
                />
                <p>
                  If dark matter is mysterious, dark energy is even more
                  perplexing. In the 1990s, astronomers made a startling
                  discovery: the universe isn't just expanding, it's expanding
                  at an accelerating rate. This acceleration contradicts our
                  expectations—gravity should be pulling everything back
                  together, right?
                </p>
                <p>
                  The driving force behind this acceleration is what scientists
                  call dark energy. This mysterious energy accounts for about
                  70% of the total energy in the universe. Yet, like dark
                  matter, dark energy remains a puzzle. Is it a property of
                  space itself? Is it linked to the quantum vacuum? These are
                  questions that researchers are working hard to answer, but for
                  now, dark energy remains one of the most profound enigmas in
                  cosmology.
                </p>
                <h4 className="mt-4">
                  Black Holes: The Beacons of the Universe
                </h4>
                <img
                  src="/bg4.webp"
                  className="img-fluid mb-3"
                  alt="Blog Image"
                />
                <p>
                  One of the greatest mysteries of the universe is the existence
                  of dark matter. Comprising roughly 85% of the total mass of
                  the universe, dark matter is invisible. We cannot see it,
                  touch it, or directly detect it using conventional scientific
                  instruments. Yet, we know it’s there—its gravitational
                  influence on galaxies and cosmic structures is undeniable.
                </p>
                <p>
                  Dark matter plays a pivotal role in the formation of galaxies.
                  Without it, the galaxies would not have enough mass to stay
                  bound together. However, despite decades of research,
                  scientists still don’t know what dark matter is composed of.
                  Leading theories suggest it could be made of weakly
                  interacting massive particles (WIMPs) or other exotic
                  particles beyond the standard model of physics. But so far,
                  the search for direct evidence remains elusive.
                </p>
                <h4 className="mt-4">Dark Energy: The Accelerating Universe</h4>
                <img
                  src="/bg4.webp"
                  className="img-fluid mb-3"
                  alt="Blog Image"
                />
                <p>
                  If dark matter is mysterious, dark energy is even more
                  perplexing. In the 1990s, astronomers made a startling
                  discovery: the universe isn't just expanding, it's expanding
                  at an accelerating rate. This acceleration contradicts our
                  expectations—gravity should be pulling everything back
                  together, right?
                </p>
                <p>
                  The driving force behind this acceleration is what scientists
                  call dark energy. This mysterious energy accounts for about
                  70% of the total energy in the universe. Yet, like dark
                  matter, dark energy remains a puzzle. Is it a property of
                  space itself? Is it linked to the quantum vacuum? These are
                  questions that researchers are working hard to answer, but for
                  now, dark energy remains one of the most profound enigmas in
                  cosmology.
                </p>
              </div>
            </div>
          </div>

          {/* Right aside container for recent posts */}
          <div className="col-md-4">
            <div className="aside-container">
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Cast your Spell with fiery.</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    About Us
                  </h6>
                  <p className="card-text">
                    At Firehouse, we ignite connections. As a cutting-edge
                    messaging platform, we deliver fast, secure, and seamless
                    communication for individuals and businesses alike. Whether
                    you're coordinating with friends, managing teams, or
                    building communities, Firehouse ensures your conversations
                    are always in safe hands, with blazing speed and end-to-end
                    encryption. Join us and fuel the fire of communication!
                  </p>
                  <a href="/" className="card-link">
                    Visit Page
                  </a>
                  <a href="#footer" className="card-link">
                    Learn more
                  </a>
                </div>
              </div>

              <div className="card mt-4">
                <div className="card-header">
                  <h5>Recent Posts</h5>
                </div>
                <div className="card-body">
                  <ul className="recent-posts my-4">
                    {blogData.length > 0 &&
                      blogData.map((data, index) => {
                        return (
                          <div key={index}>
                            <Link to={`/blog/${data.id}`}>
                              {" "}
                              <BlogCard
                                key={index}
                                id={data.id}
                                title={data.title}
                                content={data.content}
                                author={data.author}
                              />{" "}
                            </Link>
                          </div>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SampleBlog;
