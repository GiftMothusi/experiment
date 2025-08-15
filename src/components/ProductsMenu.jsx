import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const menuItems = [
  {
    id: 'radiant',
    title: 'RADI<b>A</b>NT',
    displayTitle: 'RADIANT',
    subtitle: 'Game of Games',
    description: 'Earn rewards from playing your favorite games across Web2 & Web3',
    status: 'Coming Soon',
    image: 'img/gallery-1.webp'
  },
  {
    id: 'zigma',
    title: 'ZIG<b>M</b>A',
    displayTitle: 'ZIGMA',
    subtitle: 'NFT Collection', 
    description: 'Redefining NFT Identity with Zentry\'s IP and AI',
    status: 'Coming Soon',
    image: 'img/gallery-2.webp'
  },
  {
    id: 'nexus',
    title: 'N<b>E</b>XUS',
    displayTitle: 'NEXUS',
    subtitle: 'Metagame Portal',
    description: 'A new dimension of play for humans & AI to earn & build legacy',
    status: 'Launch Site',
    image: 'img/gallery-3.webp'
  },
  {
    id: 'azul',
    title: 'AZ<b>U</b>L',
    displayTitle: 'AZUL',
    subtitle: 'AI Agent',
    description: 'Elevating your agentic AI experience, everywhere.',
    status: 'Coming Soon',
    image: 'img/gallery-4.webp'
  }
]

const ProductsMenu = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState(menuItems[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const overlayRef = useRef(null)
  const menuRef = useRef(null)
  const contentRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const cardRefs = useRef([])
  const menuItemsContainerRef = useRef(null)
  const menuItemRefs = useRef([])

  useGSAP(() => {
    if (isOpen) {
      // Set initial states
      gsap.set(overlayRef.current, { 
        opacity: 0,
        pointerEvents: 'auto'
      })
      
      gsap.set(menuRef.current, { 
        y: '-100%'
      })

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 50
      })

      // Set initial menu items container position to center first item
      const itemHeight = 200;
      const centerOffset = (menuItems.length - 1) * itemHeight / 2;
      gsap.set(menuItemsContainerRef.current, {
        y: centerOffset
      })

      // Set initial card positions in true 3D circular arrangement
      const radius = 300; // Distance from center
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const angle = (index * 90) * (Math.PI / 180); // 90 degrees apart
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          gsap.set(card, {
            x: x,
            z: z,
            rotateY: -index * 90, // Face outward from circle center
            rotateX: -15, // Tilt cards for better 3D effect
            opacity: 0, // Start invisible, will animate in
            scale: 0.9
          })
        }
      })

      // Animation timeline
      const tl = gsap.timeline()
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      
      .to(menuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: "power3.out"
      }, '-=0.1')
      
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, '-=0.4')

      // Animate all cards in with proper 3D visibility
      .to(cardRefs.current, {
        opacity: (index) => index === 0 ? 1 : 0.7, // Front card full opacity, others visible
        scale: (index) => index === 0 ? 1.1 : 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, '-=0.3')

    } else {
      // Exit animation with null checks
      const tl = gsap.timeline()
      
      if (contentRef.current) {
        tl.to(contentRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in"
        })
      }
      
      // Animate only existing card elements
      const validCards = cardRefs.current.filter(card => card !== null)
      if (validCards.length > 0) {
        tl.to(validCards, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in"
        }, '<')
      }
      
      if (menuRef.current) {
        tl.to(menuRef.current, {
          y: '-100%',
          duration: 0.5,
          ease: "power3.in"
        }, '-=0.1')
      }
      
      if (overlayRef.current) {
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { pointerEvents: 'none' })
            }
          }
        }, '-=0.2')
      }
    }
  }, [isOpen])

  const handleItemHover = (item, index) => {
    if (index !== currentIndex) {
      setActiveItem(item)
      setCurrentIndex(index)
      
      // Calculate vertical offset to center the selected item
      const itemHeight = 200;
      const centerOffset = (menuItems.length - 1) * itemHeight / 2;
      const targetOffset = index * itemHeight;
      const moveDistance = centerOffset - targetOffset;
      
      // Animate the menu items container
      gsap.to(menuItemsContainerRef.current, {
        y: moveDistance,
        duration: 1.2,
        ease: "power2.inOut"
      })
      
      // Rotate the entire circular container to bring selected card to front
      const rotationAngle = -index * 90; // Rotate circle to bring card to front
      gsap.to(cardsContainerRef.current, {
        rotateY: rotationAngle,
        duration: 0.8,
        ease: "power2.out"
      })

      // Update scale and opacity - front card larger, others visible
      cardRefs.current.forEach((card, i) => {
        if (card) {
          const isFront = i === index;
          gsap.to(card, {
            scale: isFront ? 1.1 : 0.9,
            opacity: isFront ? 1 : 0.7, // Keep others visible
            duration: 0.6,
            ease: "power2.out"
          })
        }
      })
    }
  }

  const handleMouseMove = (e) => {
    if (!cardsContainerRef.current) return;
    
    const rect = cardsContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Subtle tilt effect for the entire circular structure
    const tiltX = (mouseY / rect.height) * -10; // Max 10 degrees
    const tiltZ = (mouseX / rect.width) * 5;    // Max 5 degrees
    
    // Apply tilt to the entire container (preserving the Y rotation)
    const currentRotationY = -currentIndex * 90;
    gsap.to(cardsContainerRef.current, {
      rotateX: tiltX,
      rotateY: currentRotationY, // Maintain current Y rotation
      rotateZ: tiltZ,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = () => {
    // Reset tilt but maintain Y rotation for current card
    const currentRotationY = -currentIndex * 90;
    gsap.to(cardsContainerRef.current, {
      rotateX: 0,
      rotateY: currentRotationY,
      rotateZ: 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }

  if (!isOpen) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black pointer-events-none"
      onClick={onClose}
    >
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[101] bg-gradient-to-br from-black via-gray-900 to-purple-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[102] w-10 h-10 flex items-center justify-center text-white text-3xl hover:text-gray-300 transition-colors duration-200"
        >
          ×
        </button>

        {/* Menu Content */}
        <div 
          ref={contentRef}
          className="flex h-full w-full"
        >
          {/* Left Side - Menu Items */}
          <div className="flex-1 flex flex-col justify-center px-16 md:px-24">
            <div 
              ref={menuItemsContainerRef}
              className="space-y-8"
            >
              <div className="space-y-8">
                {menuItems.map((item, index) => (
                  <div
                    key={item.id}
                    ref={el => menuItemRefs.current[index] = el}
                    className={`cursor-pointer transition-all duration-300 ${
                      currentIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                    onMouseEnter={() => handleItemHover(item, index)}
                  >
                    <div className="space-y-2">
                      <p className={`text-sm font-general uppercase tracking-wide transition-all duration-300 ${
                        currentIndex === index 
                          ? 'text-white' 
                          : 'text-[#5542ff] hover:text-white'
                      }`}>
                        {item.subtitle}
                      </p>
                      <h2 
                        className={`special-font font-zentry font-black text-6xl md:text-8xl lg:text-9xl transition-all duration-300 ${
                          currentIndex === index 
                            ? 'text-white' 
                            : 'text-[#5542ff] hover:text-white'
                        }`}
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Single Large Card */}
          <div className="hidden lg:flex flex-1 items-center justify-center pr-16">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: '1500px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                ref={cardsContainerRef}
                className="relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  width: '700px',
                  height: '700px'
                }}
              >
                {menuItems.map((item, index) => (
                  <div
                    key={item.id}
                    ref={el => cardRefs.current[index] = el}
                    className="absolute w-96 h-[500px] rounded-xl overflow-hidden shadow-2xl"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-192px', // Half of w-96
                      marginTop: '-250px'   // Half of h-[500px]
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Card overlay content - only show on front card */}
                    {currentIndex === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white font-zentry font-black text-2xl mb-2">
                          {item.displayTitle} — {item.subtitle}
                        </h3>
                        <p className="text-gray-300 font-circular-web text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-general uppercase tracking-wide ${
                            item.status === 'Launch Site' 
                              ? 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30'
                              : 'bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-500 border-opacity-30'
                          }`}>
                            {item.status}
                          </span>
                          {item.status === 'Launch Site' && (
                            <button className="px-4 py-1 rounded-full text-xs font-general uppercase tracking-wide bg-green-600 text-white hover:bg-green-500 transition-colors duration-200">
                              Launch Site →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsMenu