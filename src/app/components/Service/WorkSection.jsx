import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";
import { categories } from "../../data/categories";
const WorkSection = ({ openModal }) => {
  const [imagesAreLoaded, setImagesAreLoaded] = useState(false); // Track if all images are loaded



  const galleryRef = useRef(null); // Ref for the gallery container
  const [isotopeInstance, setIsotopeInstance] = useState(null); // Store the Isotope instance
  const [activeFilter, setActiveFilter] = useState({ category: "*", subcategory: "*" }); // Track active filter
  // const [filteredCategories, setFilteredCategories] = useState(categories); // Store the filtered categories
  const location = useLocation(); // Access URL location

  useEffect(() => {
    if (galleryRef.current && imagesAreLoaded && !isotopeInstance) {
      // Initialize Isotope only if the galleryRef is ready
      const instance = new Isotope(galleryRef.current, {
        itemSelector: ".items", // Class for items in the gallery
        layoutMode: "fitRows",        // Use the fitRows layout mode
        percentPosition: true,  // Ensures that items are correctly positioned relative to their parent
      });

      setIsotopeInstance(instance);
      // // Wait for images to load before layout
      imagesLoaded(galleryRef.current, () => {
        console.log("Images loaded, applying layout...");
        // Only arrange and layout after the isotopeInstance is properly set
        if (isotopeInstance) {
          isotopeInstance?.arrange();  // Apply the filter and arrange the items
          isotopeInstance?.layout();   // Recalculate the layout
        }
      });


        return () => {
        if (isotopeInstance) {
          isotopeInstance?.destroy();
        }
      };
    }
  }, [galleryRef, imagesAreLoaded, isotopeInstance]);

  const handleImageLoad = (id) => {
    // Add the loaded image's ID to the state
    setLoadedImages((prev) => [...prev, id]);
  };

  useEffect(() => {
    if (isotopeInstance) {
      // Apply filter when activeFilter changes
      // Create the filter string based on category and subcategory
      // const categoryFilter = activeFilter.category === "*" ? "*" : `${activeFilter.category}`;
      // const subcategoryFilter = activeFilter.subcategory === "*" ? "*" : `${activeFilter.subcategory}`;
      let filter = "*"; // Default to show all items

      if (activeFilter.category !== "*" && activeFilter.subcategory === "*") {
        // If category is specified but subcategory is "*", filter by category only
        filter = `.${activeFilter.category}`;
        console.log(filter)
      } else if (activeFilter.category !== "*" && activeFilter.subcategory !== "*") {
        // If both category and subcategory are specified, filter by both
        filter = `.${activeFilter.category}.${activeFilter.subcategory}`;
      }

      isotopeInstance.arrange({ filter });
      // Force re-layout after applying filters
      // imagesLoaded(galleryRef.current, () => {
      //   isotopeInstance.layout();
      // });
    }
  }, [activeFilter, isotopeInstance]);

  // Handle image loading and track when all images are loaded
  useEffect(() => {
    if (galleryRef.current) {
      const imgLoad = imagesLoaded(galleryRef.current);
      imgLoad.on("progress", (instance, image) => {
        if (!image.isLoaded) {
          console.warn("Image failed to load:", image.img.src);
        }
      });

      imgLoad.on("always", () => {
        setImagesAreLoaded(true); // Mark images as fully loaded
      });
    }
  }, [galleryRef]);

  const handleFilterClick = (filterValue, subValue) => {
    // setHoveredFilter(filterValue);
    setActiveFilter({ category: filterValue, subcategory: subValue }); // Update the active filter
    // const filtered = categories.filter(category => category.category === filterValue);
    // console.log(filtered)
    // setFilteredCategories(filtered); // Update the filtered categories
  };

  const isImageLoaded = (id) => loadedImages.includes(id); // Check if the image is loaded


  // Handle URL query parameters to set the initial filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterFromUrl = params.get("filter"); // Get the "filter" query parameter
    const sourceFromUrl = params.get("source") || "*"; // Get the "source" query parameter
    if (filterFromUrl) {
      console.log("Source from URL:", filterFromUrl, sourceFromUrl,);
      // Filter categories based on the 'source' parameter
      // const filtered = categories.filter(category => category.sub === sourceFromUrl);
      // setFilteredCategories(filtered); // Update the filtered categories
      setActiveFilter({ category: filterFromUrl, subcategory: sourceFromUrl }); // Update filter from URL query
    } else {
      setActiveFilter({ category: "*", subcategory: "*" }); // Default to show all if no filter parameter
      // setFilteredCategories(categories); // Show all categories
    }
  }, [location.search]);






  return (
    <section className="work-stand section-padding sub-bg desktop:px-40">
      <div className="container-xxl">
        <div className="row">
          {/* filter links */}
          <div className="filtering col-12 mb-50 text-center">

            <div className="filter mb-4">
              <span className="text">Filter By :</span>
              <span data-filter="*" className={activeFilter.category === "*" ? "active" : ""}
                onClick={() => handleFilterClick("*", "*")}

              >
                Show All
              </span>
              <span
                data-filter=".graphic" className={activeFilter.category === "graphic" ? "active" : ""}
                onClick={() => handleFilterClick("graphic", "*")}
              // onMouseEnter={() => handleMouseEnterCategory("graphic")}
              // onMouseLeave={handleMouseLeaveCategory}
              >
                Graphic Design

                {/* {hoveredCategory === "graphic" && (
                  <div onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown} className="dropdown absolute left-[-20px] mt-2 rounded-md z-[99] bg-[#1e1b1b] min-w-[250px] max-w-[500px] p-2 flex flex-col gap-2 items-start">
                   <div className="flex justify-between items-center border-b border-[#e5e7eb] w-full py-2">
                      <span className="">Sub-categories</span>
                      <span onClick={() => closeSubCategory()} className="transform transition-transform duration-300 hover:scale-110">X</span>
                   </div>
                    <span onClick={() => handleFilterClick(".graphic.sub1")} className="transform transition-transform duration-300 hover:scale-110">
                      Amazon Listings
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      UI/UX
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      Graphics & Animation
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      Social Media
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      AI-Assisted
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      Packaging
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      Printing
                    </span>
                    <span onClick={() => handleFilterClick(".graphic.sub2")} className="transform transition-transform duration-300 hover:scale-110">
                      Sticker Wrap
                    </span>
                  </div>
                )} */}

              </span>
              <span
                data-filter=".web" className={activeFilter.category === "web" ? "active" : ""}
                onClick={() => handleFilterClick("web", "*")}
              >
                Web Solutions
              </span>
              <span
                data-filter=".video" className={activeFilter.category === "video" ? "active" : ""}
                onClick={() => handleFilterClick("video", "*")}
              // onClick={() => handleFilterChange('.video')}
              >
                Video Production
              </span>

            </div>

          </div>
        </div>

        {!imagesAreLoaded && (
          <div className={`gallery row stand-marg`}>
            {categories.map((item) => (
              <div key={item.id} className={`col-lg-4 col-md-6 transition-transform transform scale-100 hover:scale-110 duration-300 items`}>
                <div className="item mb-40">
                  <div className="skeleton-loader flex items-center justify-center h-52 bg-gray-200 animate-pulse">
                    <span className="loader-spinner text-lg text-gray-500">Loading...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* {!imagesAreLoaded && categories.map((item) => (
          <div key={item.id} className={`col-lg-4 col-md-6 transition-transform transform scale-100 hover:scale-110 duration-300 items ${item.category} ${item.sub}`}>
            <div className="item mb-40">
              <div className="skeleton-loader flex items-center justify-center h-40 bg-gray-200 animate-pulse">
                <span className="loader-spinner text-lg text-gray-500">Loading...</span>
              </div>
            </div>
          </div>
        ))} */}

        {/* {!imagesAreLoaded && (
          <div className="skeleton-loader flex items-center justify-center h-40 bg-gray-200 animate-pulse">
            <span className="loader-spinner text-lg text-gray-500">Loading...</span>
          </div>
        )} */}

        <div className={`gallery row stand-marg ${!imagesAreLoaded ? "opacity-0" : "opacity-100"}`} ref={galleryRef}>
          {categories.map((item) => (

            <div key={item.id} className={`col-lg-4 col-md-6 transition-transform transform scale-100 hover:scale-110 duration-300 items ${item.category} ${item.sub}`}>
              <div className="item mb-40">

                {/* Image */}
                <a
                  onClick={() => openModal(item.imgSrc[1], item.type)}
                  className="img"
                >
                  <img
                    src={item.imgSrc[0]}
                    alt={item.title}
                  // className={isImageLoaded(item.id) ? "opacity-100" : "opacity-0"}
                  // onLoad={() => handleImageLoad(item.id)}
                  />
                </a>
                <div className="cont mt-2">
                  <h5 className="fz-12 text-center">
                    Tags: <span className="text-xs">{item.title} | {item.categoryLabel} </span>
                  </h5>
                  {/* <p>
                    <a onClick={() => openModal(item.imgSrc[1], item.type)}>{item.categoryLabel} <span className="icon ti-arrow-top-right text-xl tablet:text-xl"></span></a>
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



    </section>
  );
};

export default WorkSection;
