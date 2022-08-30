export const VSHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export const FSHADER_SOURCE = `
precision lowp float;
const float	WIDTH		= 1600.0;
const float	HEIGHT		= 1200.0;
const vec2	scale		= vec2( WIDTH, HEIGHT );
const float	GAP		= 32.0;
const float	BIOS		= 0.01;
const float	PADDING		= 10.0;
const float	DOT		= 32.;
const int	BALL_NUM	= 8;
const int	BALL_NUM2	= 6;
uniform vec3	u_balls[BALL_NUM];
uniform vec3	u_balls2[BALL_NUM2];
uniform vec2	u_triangle[3];

void drawCross( float x, float y )
{
	float g = 0.4;
	if ( x > 326.0 && x < 1316.0 && y > 672.0 && y < 1155.0 && (mod( x + 5.4, GAP ) > PADDING) && (mod( y + 5.4, GAP ) > PADDING) && ( (mod( (y - x) / GAP - 1., 2. ) < BIOS) || (mod( y + x, GAP * 2. ) < BIOS) ) )
	{
		gl_FragColor = vec4( g, g, g, 1.0 );
	}
}


bool drawDots( float x, float y )
{
	x	-= 42.;
	y	-= 42.;

	if ( x > 16.0 && x < 752.0 && y > 560.0 && y < 882.0 )
	{
		float	xb	= mod( x, DOT ); float mxb = DOT - mod( x, DOT );
		float	yb	= mod( y, DOT ); float myb = DOT - mod( y, DOT );
		float	dott	= 158.;
		float	xbb	= xb * xb; float xmm = mxb * mxb;
		float	ybb	= yb * yb; float ymm = myb * myb;
		if ( xbb + ybb < dott || xmm + ybb < dott || xbb + ymm < dott || xmm + ymm < dott )
		{
			float b = max( (0.96 - (y + 148.) / HEIGHT) * 2.6, (x + 48.) / WIDTH * 1.8 );
			gl_FragColor = vec4( b, b, b, 1.0 );
		}else{
			gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
		}
		return(true);
	}
	return(false);
}


bool drawBall1( float x, float y )
{
	float v = 0.0;

	for ( int i = 0; i < BALL_NUM; i++ )
	{
		vec3	mb	= u_balls[i];
		float	dx	= mb.x - x;
		float	dy	= mb.y - y;
		float	r	= mb.z;
		v += r * r / (dx * dx + dy * dy);
	}
	if ( v > .91 )
	{
		gl_FragColor = vec4( x / WIDTH / 1.5, y / HEIGHT * 1.1,
				     0.8, .8 );
		return(true);
	}
	return(false);
}


bool drawBall2( float x, float y )
{
	float v = 0.0;
	for ( int i = 0; i < BALL_NUM2; i++ )
	{
		vec3	mb	= u_balls2[i];
		float	dx	= mb.x - x;
		float	dy	= mb.y - y;
		float	r	= mb.z;
		v += r * r / (dx * dx + dy * dy);
	}
	if ( v > 0.8 )
	{
		gl_FragColor = vec4( 0.8, y / HEIGHT / 1.3,
				     x / WIDTH / 1.1, .8 );
		return(true);
	}
	return(false);
}


float isInTriangle( vec2 newCoord )
{
	return( (cross( vec3( u_triangle[0].xy - newCoord, 0. ), vec3( u_triangle[0].xy - u_triangle[1].xy, 0. ) ).z < 0.
		 && cross( vec3( u_triangle[1].xy - newCoord, 0. ), vec3( u_triangle[1].xy - u_triangle[2].xy, 0. ) ).z < 0.
		 && cross( vec3( u_triangle[2].xy - newCoord, 0. ), vec3( u_triangle[2].xy - u_triangle[0].xy, 0. ) ).z < 0.) ? 1. : 0.);
}


bool drawTriangle( float x, float y )
{
	vec2	normalizedCoord = (vec2( x, y ) / scale) * 2. - 1.;
	float	flag		= isInTriangle( normalizedCoord );
	if ( flag > 0.5 )
	{
    float d = distance(normalizedCoord,u_triangle[0]);
		gl_FragColor = vec4( d * .47+.38, .9, .66-d*.6, .9 );
		return(true);
	}else{
		return(false);
	}
}


void main()
{
	float	x	= gl_FragCoord.x;
	float	y	= gl_FragCoord.y;

	if ( drawBall1( x, y ) )
	{
		return;
	}
	if ( drawTriangle( x, y ) )
	{
		return;
	}
	if ( drawBall2( x, y ) )
	{
		return;
	}
	if ( drawDots( x, y ) )
	{
		return;
	}
	drawCross( x, y );
}
`;
